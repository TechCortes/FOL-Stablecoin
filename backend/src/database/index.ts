import { Kysely, SqliteDialect } from 'kysely';
import SQLiteDatabase from 'better-sqlite3';
import type { User, StablecoinTransaction } from '../../../shared/src/types/index.js';

interface DatabaseSchema {
  users: {
    id: string;
    email: string;
    password_hash: string;
    name: string | null;
    created_at: string;
    updated_at: string;
  };
  transactions: {
    id: string;
    user_id: string;
    type: 'mint' | 'redeem' | 'transfer';
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
    updated_at: string;
  };
}

export class Database {
  private db: Kysely<DatabaseSchema>;

  constructor() {
    const sqlite = new SQLiteDatabase('./fol-capital.db');
    this.db = new Kysely<DatabaseSchema>({
      dialect: new SqliteDialect({ database: sqlite }),
    });
  }

  async initialize() {
    await this.createTables();
  }

  private async createTables() {
    await this.db.schema
      .createTable('users')
      .ifNotExists()
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('email', 'text', (col) => col.notNull().unique())
      .addColumn('password_hash', 'text', (col) => col.notNull())
      .addColumn('name', 'text')
      .addColumn('created_at', 'text', (col) => col.notNull())
      .addColumn('updated_at', 'text', (col) => col.notNull())
      .execute();

    await this.db.schema
      .createTable('transactions')
      .ifNotExists()
      .addColumn('id', 'text', (col) => col.primaryKey())
      .addColumn('user_id', 'text', (col) => col.notNull().references('users.id'))
      .addColumn('type', 'text', (col) => col.notNull())
      .addColumn('amount', 'real', (col) => col.notNull())
      .addColumn('status', 'text', (col) => col.notNull())
      .addColumn('created_at', 'text', (col) => col.notNull())
      .addColumn('updated_at', 'text', (col) => col.notNull())
      .execute();
  }

  async createUser(email: string, passwordHash: string, name?: string): Promise<User> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const user = await this.db
      .insertInto('users')
      .values({
        id,
        email,
        password_hash: passwordHash,
        name: name || null,
        created_at: now,
        updated_at: now,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  async findUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    const user = await this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      passwordHash: user.password_hash,
    };
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.db
      .selectFrom('users')
      .select(['id', 'email', 'name', 'created_at', 'updated_at'])
      .where('id', '=', id)
      .executeTakeFirst();

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  async createTransaction(transaction: Omit<StablecoinTransaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<StablecoinTransaction> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const result = await this.db
      .insertInto('transactions')
      .values({
        id,
        user_id: transaction.userId,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status,
        created_at: now,
        updated_at: now,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return {
      id: result.id,
      userId: result.user_id,
      type: result.type,
      amount: result.amount,
      status: result.status,
      createdAt: result.created_at,
      updatedAt: result.updated_at,
    };
  }

  async getUserTransactions(userId: string): Promise<StablecoinTransaction[]> {
    const transactions = await this.db
      .selectFrom('transactions')
      .selectAll()
      .where('user_id', '=', userId)
      .orderBy('created_at', 'desc')
      .execute();

    return transactions.map(tx => ({
      id: tx.id,
      userId: tx.user_id,
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      createdAt: tx.created_at,
      updatedAt: tx.updated_at,
    }));
  }

  getKysely() {
    return this.db;
  }
}