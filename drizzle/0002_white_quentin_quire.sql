CREATE TABLE "admin_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"anthropic_api_key_encrypted" text,
	"voice_reference_post_ids" json DEFAULT '[]'::json NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_settings" ADD CONSTRAINT "admin_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;