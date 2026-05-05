export interface JsonValue {
  [key: string]: JsonValue | JsonValue[] | string | number | boolean | null;
}

export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string;
          tenant_id: string | null;
          lead_id: string | null;
          channel: string;
          started_at: string;
          ended_at: string | null;
          language: string;
          metadata: JsonValue;
          session_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          lead_id?: string | null;
          channel?: string;
          started_at?: string;
          ended_at?: string | null;
          language?: string;
          metadata?: JsonValue;
          session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          lead_id?: string | null;
          channel?: string;
          started_at?: string;
          ended_at?: string | null;
          language?: string;
          metadata?: JsonValue;
          session_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          token_count: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          content: string;
          token_count?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          role?: "user" | "assistant" | "system";
          content?: string;
          token_count?: number | null;
          created_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          tenant_id: string | null;
          source: string;
          name: string | null;
          email: string | null;
          company: string | null;
          industry: string | null;
          budget_range: string | null;
          timeline: string | null;
          qualification_data: JsonValue;
          chat_initiated: boolean;
          messages_sent: number;
          lead_captured_at: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          source?: string;
          name?: string | null;
          email?: string | null;
          company?: string | null;
          industry?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          qualification_data?: JsonValue;
          chat_initiated?: boolean;
          messages_sent?: number;
          lead_captured_at?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          source?: string;
          name?: string | null;
          email?: string | null;
          company?: string | null;
          industry?: string | null;
          budget_range?: string | null;
          timeline?: string | null;
          qualification_data?: JsonValue;
          chat_initiated?: boolean;
          messages_sent?: number;
          lead_captured_at?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: string;
          settings: JsonValue;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: string;
          settings?: JsonValue;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          plan?: string;
          settings?: JsonValue;
          created_at?: string;
          updated_at?: string;
        };
      };
      tenant_members: {
        Row: {
          tenant_id: string;
          user_id: string;
          role: "owner" | "admin" | "member";
          created_at: string;
        };
        Insert: {
          tenant_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member";
          created_at?: string;
        };
        Update: {
          tenant_id?: string;
          user_id?: string;
          role?: "owner" | "admin" | "member";
          created_at?: string;
        };
      };
      chatbot_configs: {
        Row: {
          id: string;
          tenant_id: string;
          name: string;
          avatar: string | null;
          colors: JsonValue;
          system_prompt: string;
          welcome_message: string;
          quick_replies: JsonValue;
          enabled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          name: string;
          avatar?: string | null;
          colors?: JsonValue;
          system_prompt: string;
          welcome_message: string;
          quick_replies?: JsonValue;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          name?: string;
          avatar?: string | null;
          colors?: JsonValue;
          system_prompt?: string;
          welcome_message?: string;
          quick_replies?: JsonValue;
          enabled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      workspace_invites: {
        Row: {
          id: string;
          tenant_id: string;
          email: string;
          role: "owner" | "admin" | "member";
          token: string;
          invited_by_user_id: string;
          accepted_by_user_id: string | null;
          accepted_at: string | null;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          email: string;
          role?: "owner" | "admin" | "member";
          token: string;
          invited_by_user_id: string;
          accepted_by_user_id?: string | null;
          accepted_at?: string | null;
          expires_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          email?: string;
          role?: "owner" | "admin" | "member";
          token?: string;
          invited_by_user_id?: string;
          accepted_by_user_id?: string | null;
          accepted_at?: string | null;
          expires_at?: string;
          created_at?: string;
        };
      };
      analytics_events: {
        Row: {
          id: string;
          tenant_id: string | null;
          event_name: string;
          event_properties: JsonValue;
          session_id: string | null;
          page: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          event_name: string;
          event_properties?: JsonValue;
          session_id?: string | null;
          page?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          event_name?: string;
          event_properties?: JsonValue;
          session_id?: string | null;
          page?: string | null;
          created_at?: string;
        };
      };
      audit_requests: {
        Row: {
          id: string;
          tenant_id: string | null;
          lead_id: string | null;
          company_name: string;
          contact_name: string;
          email: string;
          industry: string | null;
          team_size: string | null;
          notes: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          lead_id?: string | null;
          company_name: string;
          contact_name: string;
          email: string;
          industry?: string | null;
          team_size?: string | null;
          notes?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          lead_id?: string | null;
          company_name?: string;
          contact_name?: string;
          email?: string;
          industry?: string | null;
          team_size?: string | null;
          notes?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
    Enums: Record<string, unknown>;
    CompositeTypes: Record<string, unknown>;
  };
}