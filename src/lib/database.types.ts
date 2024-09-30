export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Difficulty: {
        Row: {
          difficulty: number
          id: number
        }
        Insert: {
          difficulty: number
          id?: number
        }
        Update: {
          difficulty?: number
          id?: number
        }
        Relationships: []
      }
      Exercises: {
        Row: {
          id: number
          points: number | null
          solution: string | null
          title: string | null
          topic_id: number
          type_id: number | null
          url: string | null
        }
        Insert: {
          id?: number
          points?: number | null
          solution?: string | null
          title?: string | null
          topic_id: number
          type_id?: number | null
          url?: string | null
        }
        Update: {
          id?: number
          points?: number | null
          solution?: string | null
          title?: string | null
          topic_id?: number
          type_id?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Exercises_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Exercises_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "ExerciseTypes"
            referencedColumns: ["id"]
          },
        ]
      }
      ExerciseTypes: {
        Row: {
          id: number
          type_name: string
        }
        Insert: {
          id?: number
          type_name: string
        }
        Update: {
          id?: number
          type_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          analysisnote: number | null
          created_at: string
          display_name: string | null
          email: string | null
          geometrienote: number | null
          gesamtnote: number | null
          id: string
          image_url: string | null
          stochastiknote: number | null
        }
        Insert: {
          analysisnote?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          geometrienote?: number | null
          gesamtnote?: number | null
          id?: string
          image_url?: string | null
          stochastiknote?: number | null
        }
        Update: {
          analysisnote?: number | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          geometrienote?: number | null
          gesamtnote?: number | null
          id?: string
          image_url?: string | null
          stochastiknote?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      progress: {
        Row: {
          id: string
          level: number | null
          xp: number | null
        }
        Insert: {
          id: string
          level?: number | null
          xp?: number | null
        }
        Update: {
          id?: string
          level?: number | null
          xp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "muffinman_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      TestExercise: {
        Row: {
          id: number
          name: string | null
          solutions: number[] | null
        }
        Insert: {
          id?: number
          name?: string | null
          solutions?: number[] | null
        }
        Update: {
          id?: number
          name?: string | null
          solutions?: number[] | null
        }
        Relationships: []
      }
      Topics: {
        Row: {
          id: number
          name: string
          year: number | null
        }
        Insert: {
          id?: number
          name: string
          year?: number | null
        }
        Update: {
          id?: number
          name?: string
          year?: number | null
        }
        Relationships: []
      }
      xp: {
        Row: {
          id: number
          "level 1": number
          "level 2": number | null
          "level 3": number | null
          "level 4": number | null
          "level 5": number | null
        }
        Insert: {
          id?: number
          "level 1"?: number
          "level 2"?: number | null
          "level 3"?: number | null
          "level 4"?: number | null
          "level 5"?: number | null
        }
        Update: {
          id?: number
          "level 1"?: number
          "level 2"?: number | null
          "level 3"?: number | null
          "level 4"?: number | null
          "level 5"?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_random_exercise: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          topic_id: number
          type_id: number
          difficulty_id: number
          solution: string
          url: string
          title: string
        }[]
      }
      get_test_exercise: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["test_exercise_type"]
      }
      getrandomexercise: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          points: number | null
          solution: string | null
          title: string | null
          topic_id: number
          type_id: number | null
          url: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      test_exercise_type: {
        id: number | null
        name: string | null
        int_array: number[] | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
