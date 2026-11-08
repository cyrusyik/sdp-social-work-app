PRAGMA foreign_keys = ON;
CREATE TABLE staff (
  staff_id TEXT NOT NULL PRIMARY KEY,
  chinese_name TEXT NOT NULL,
  english_last_name TEXT NOT NULL,
  english_first_name TEXT NOT NULL,
  english_middle_name TEXT,
  password_hash TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE client (
  client_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),

  chinese_name TEXT NOT NULL,
  english_last_name TEXT NOT NULL,
  english_first_name TEXT NOT NULL,
  english_middle_name TEXT,
  primary_worker_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (primary_worker_id) REFERENCES staff(staff_id) ON DELETE SET NULL
);

CREATE TABLE audio_recording (
  recording_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),

  client_id TEXT NOT NULL,
  uploaded_by TEXT,
  file_path TEXT NOT NULL,
  duration_seconds INTEGER,
  transcript TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES staff(staff_id) ON DELETE SET NULL
);

CREATE TABLE form (
  form_id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
  form_type TEXT NOT NULL CHECK (form_type in ('field_mentoring','empowerment_plan','strengths_assessment','group_supervision')),

  client_id TEXT NOT NULL,
  created_by TEXT NOT NULL,
  recording_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES staff(staff_id) ON DELETE RESTRICT,
  FOREIGN KEY (recording_id) REFERENCES audio_recording(recording_id) ON DELETE SET NULL
);

-- Form 1: 實地探訪督導一事前預備工作紙
CREATE TABLE field_mentoring (
  form_id TEXT PRIMARY KEY NOT NULL,

  targeted_skill TEXT NOT NULL, -- Q1: 想學習的技巧/方法
  client_details TEXT NOT NULL, -- Q2: 案主資料
  setting_details TEXT NOT NULL, -- Q3 環境
  supervisor_role TEXT NOT NULL, -- Q4: 督導員角色
  supervisor_role_other TEXT, -- Q4: other
  client_benefit TEXT NOT NULL, -- Q5: 案主實際得著

  FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE
);

-- Form 2: 我的個人充權計劃
CREATE TABLE empowerment_plan (
  form_id TEXT PRIMARY KEY NOT NULL,

  key_support TEXT NOT NULL,
  goal TEXT NOT NULL,
  goal_importance TEXT NOT NULL,

  FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE
);

-- Weak Entity: Dynamic Action Steps Array for Empowerment Plan (1-to-N)
CREATE TABLE action_step (
  step_id TEXT DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
  form_id TEXT NOT NULL,

  step_description TEXT NOT NULL, -- 從今天起我會做以下的事
  responsible_part TEXT NOT NULL, -- 誰會行動？
  date_set TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, -- ISO format YYYY-MM-DD
  date_accomplished TEXT, -- ISO format YYYY-MM-DD
  date_to_be_accomplished TEXT NOT NULL, -- ISO format YYYY-MM-DD
  comment TEXT,

  PRIMARY KEY (step_id, form_id),
  FOREIGN KEY (form_id) REFERENCES empower_plan(form_id) ON DELETE CASCADE
);

-- Form 3: 優勢評估表
CREATE TABLE strengths_assessment (
  form_id TEXT PRIMARY KEY NOT NULL,
  assessment_date TEXT NOT NULL DEFAULT (date('now')),
  domain_matrix TEXT NOT NULL DEFAULT '{}',

  priority_1 text,
  priority_2 text,
  priority_3 text,
  priority_4 text,
  priority_5 text,
  priority_6 text,
  priority_7 text,

  FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE
);

-- Weak Entity: 6-Month Periodic Reviews
CREATE TABLE periodic_review (
  review_id TEXT DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
  form_id TEXT NOT NULL,
  review_stage TEXT NOT NULL CHECK (review_stage IN ('1st_review', '2nd_review', '3rd_review')),
  review_date TEXT NOT NULL, -- ISO format YYYY-MM-DD
  important_things_to_know TEXT, -- 關於我的重要事情

  rating_housing INTEGER CHECK (rating_housing BETWEEN 1 AND 5),
  rating_employment INTEGER CHECK (rating_employment BETWEEN 1 AND 5),
  rating_education INTEGER CHECK (rating_education BETWEEN 1 AND 5),
  rating_relationships INTEGER CHECK (rating_relationships BETWEEN 1 AND 5),
  rating_community INTEGER CHECK (rating_community BETWEEN 1 AND 5),
  rating_health INTEGER CHECK (rating_health BETWEEN 1 AND 5),
  general_comment TEXT,

  PRIMARY KEY (review_id, form_id),
  FOREIGN KEY (form_id) REFERENCES strengths_assessment(form_id) ON DELETE CASCADE
);

CREATE TABLE group_supervision (
  form_id TEXT PRIMARY KEY NOT NULL,
  client_goal TEXT NOT NULL,
  smcm_start_date TEXT NOT NULL, -- ISO format YYYY-MM-DD
  previous_presented_date TEXT,
  help_requested TEXT NOT NULL,
  current_situation_and_attempts TEXT NOT NULL,
  group_suggestion TEXT NOT NULL,
  next_step TEXT NOT NULL,
  FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE CASCADE
);


CREATE TABLE chat_session (
  session_id TEXT DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
  staff_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '新對話',

  context_client_id TEXT,
  context_form_id TEXT,

  is_pinned INTEGER NOT NULL DEFAULT 0 CHECK (is_pinned IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (session_id, staff_id),
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE SET NULL,
  FOREIGN KEY (form_id) REFERENCES form(form_id) ON DELETE SET NULL
);

CREATE TABLE chat_message (
  message_id TEXT DEFAULT (lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-a' || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6)))),
  session_id TEXT NOT NULL,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,

  sources_cited TEXT DEFAULT '[]',
  model_used TEXT DEFAULT 'gpt-4o-mini',
  tokens_used INTEGER DEFAULT 0,

  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (message_id, session_id),
  FOREIGN KEY (session_id) REFERENCES chat_session(session_id) ON DELETE CASCADE,
);

-- ============================================================================
-- 5. INDEXES FOR PERFORMANCE & SEARCHING
-- ============================================================================

-- Index for searching clients by name
CREATE INDEX idx_clients_search ON client(english_last_name, english_first_name);

-- Index for Form filtering and sorting in UI (表格 View)
CREATE INDEX idx_forms_filtering_update ON form(form_type, updated_at DESC);
CREATE INDEX idx_forms_filtering_created ON form(form_type, created_at DESC);

-- Index for Client timeline viewing (案主 View)
CREATE INDEX idx_forms_client_timeline ON form(client_id, created_at DESC);

-- Index for fast retrieval of Chat threads
CREATE INDEX idx_chat_sessions_staff ON chat_session(staff_id, updated_at DESC);
CREATE INDEX idx_chat_messages_session ON chat_message(session_id, created_at ASC);

-- ============================================================================
-- 6. AUTOMATIC TIMESTAMP TRIGGERS
-- ============================================================================

CREATE TRIGGER update_staff_timestamp AFTER UPDATE ON staff BEGIN
    UPDATE staff SET updated_at = CURRENT_TIMESTAMP WHERE staff_id = NEW.staff_id;
END;

CREATE TRIGGER update_clients_timestamp AFTER UPDATE ON client BEGIN
    UPDATE client SET updated_at = CURRENT_TIMESTAMP WHERE client_id = NEW.client_id;
END;

CREATE TRIGGER update_forms_timestamp AFTER UPDATE ON form BEGIN
    UPDATE form SET updated_at = CURRENT_TIMESTAMP WHERE form_id = NEW.form_id;
END;

CREATE TRIGGER update_chat_session_timestamp AFTER INSERT ON chat_message BEGIN
    UPDATE chat_session SET updated_at = CURRENT_TIMESTAMP WHERE session_id = NEW.session_id;
END;