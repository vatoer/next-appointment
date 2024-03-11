import { pgTable, pgEnum, varchar, timestamp, text, integer, foreignKey, uniqueIndex, jsonb, serial, boolean, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const formStatus = pgEnum("FormStatus", ['DRAFT', 'FINAL'])
export const stepName = pgEnum("StepName", ['INIT', 'FORM_FILLING', 'FORM_CONFIRMATION', 'APPOINTMENT', 'DOCUMENT_UPLOAD', 'VISIT', 'PAYMENT', 'PROCESSING', 'COMPLETED', 'REJECTED', 'NEEDS_MORE_INFO'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const bookedService = pgTable("BookedService", {
	id: text("id").primaryKey().notNull(),
	code: text("code"),
	appointmentDate: timestamp("appointmentDate", { precision: 3, mode: 'string' }),
	serviceId: text("serviceId").notNull().references(() => service.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	status: stepName("status").default('FORM_FILLING').notNull(),
	createdBy: text("createdBy").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
});

export const filledForm = pgTable("FilledForm", {
	id: text("id").primaryKey().notNull(),
	formId: text("formId").notNull().references(() => form.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	bookedServiceId: text("bookedServiceId").notNull().references(() => bookedService.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	formDataJson: jsonb("formDataJson").notNull(),
	status: formStatus("status").default('DRAFT').notNull(),
	createdBy: text("createdBy").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }),
},
(table) => {
	return {
		formIdBookedServiceIdKey: uniqueIndex("FilledForm_formId_bookedServiceId_key").on(table.formId, table.bookedServiceId),
	}
});

export const form = pgTable("Form", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
});

export const service = pgTable("Service", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	categoryId: text("categoryId").references(() => category.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const category = pgTable("Category", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const step = pgTable("Step", {
	id: serial("id").primaryKey().notNull(),
	name: stepName("name").default('FORM_FILLING').notNull(),
	description: text("description").notNull(),
	sequence: integer("sequence").notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	serviceId: text("serviceId").notNull().references(() => service.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		serviceIdSequenceKey: uniqueIndex("Step_serviceId_sequence_key").on(table.sequence, table.serviceId),
		serviceIdNameKey: uniqueIndex("Step_serviceId_name_key").on(table.name, table.serviceId),
	}
});

export const bookedStep = pgTable("BookedStep", {
	id: serial("id").primaryKey().notNull(),
	completedAt: timestamp("completedAt", { precision: 3, mode: 'string' }),
	stepId: integer("stepId").notNull().references(() => step.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	bookedServiceId: text("bookedServiceId").notNull().references(() => bookedService.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const serviceRequirement = pgTable("ServiceRequirement", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	type: text("type").notNull(),
	required: boolean("required").default(false).notNull(),
	description: text("description"),
	serviceId: text("serviceId").notNull().references(() => service.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const serviceRequirementTranslation = pgTable("ServiceRequirementTranslation", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	language: text("language").notNull(),
	locale: text("locale"),
	serviceRequirementId: text("serviceRequirementId").notNull().references(() => serviceRequirement.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const verificationToken = pgTable("VerificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		tokenKey: uniqueIndex("VerificationToken_token_key").on(table.token),
		identifierTokenKey: uniqueIndex("VerificationToken_identifier_token_key").on(table.identifier, table.token),
	}
});

export const user = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	password: text("password"),
	emailVerified: timestamp("emailVerified", { precision: 3, mode: 'string' }),
	image: text("image"),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		emailKey: uniqueIndex("User_email_key").on(table.email),
	}
});

export const account = pgTable("Account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		providerProviderAccountIdKey: uniqueIndex("Account_provider_providerAccountId_key").on(table.provider, table.providerAccountId),
	}
});

export const session = pgTable("Session", {
	id: text("id").primaryKey().notNull(),
	sessionToken: text("sessionToken").notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	expires: timestamp("expires", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionTokenKey: uniqueIndex("Session_sessionToken_key").on(table.sessionToken),
	}
});

export const serviceForm = pgTable("ServiceForm", {
	formId: text("formId").notNull().references(() => form.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	serviceId: text("serviceId").notNull().references(() => service.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	formOrder: integer("formOrder"),
},
(table) => {
	return {
		serviceFormPkey: primaryKey({ columns: [table.formId, table.serviceId], name: "ServiceForm_pkey"})
	}
});