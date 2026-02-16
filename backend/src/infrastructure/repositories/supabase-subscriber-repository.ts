import { supabase } from "../database/supabase-client";
import { ISubscriberRepository } from "../../domain/repositories/subscriber-repository.interface";
import {
  Subscriber,
  CreateSubscriberDTO,
} from "../../domain/entities/subscriber";

interface SubscriberRow {
  id: string;
  email: string;
  source: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function toDomain(row: SubscriberRow): Subscriber {
  return {
    id: row.id,
    email: row.email,
    source: row.source,
    isActive: row.is_active,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export class SupabaseSubscriberRepository implements ISubscriberRepository {
  async findAll(): Promise<Subscriber[]> {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw new Error(`Failed to fetch subscribers: ${error.message}`);
    return (data as SubscriberRow[]).map(toDomain);
  }

  async findByEmail(email: string): Promise<Subscriber | null> {
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw new Error(`Failed to find subscriber: ${error.message}`);
    }
    return toDomain(data as SubscriberRow);
  }

  async create(dto: CreateSubscriberDTO): Promise<Subscriber> {
    const { data, error } = await supabase
      .from("subscribers")
      .insert({
        email: dto.email.toLowerCase().trim(),
        source: dto.source || "footer",
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create subscriber: ${error.message}`);
    return toDomain(data as SubscriberRow);
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) throw new Error(`Failed to delete subscriber: ${error.message}`);
    return true;
  }

  async count(): Promise<number> {
    const { count, error } = await supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    if (error) throw new Error(`Failed to count subscribers: ${error.message}`);
    return count ?? 0;
  }
}
