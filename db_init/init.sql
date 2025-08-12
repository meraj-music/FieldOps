-- #############################################################################
-- # Table Creation
-- #############################################################################

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Partners Table (Clients/Buyers)
CREATE TABLE partners (
    partner_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50)
);

-- Initiatives Table
CREATE TABLE initiatives (
    initiative_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Planning', -- Planning, Active, Completed, Blocked
    tags TEXT[],
    owner_id INTEGER REFERENCES users(user_id),
    partner_id INTEGER REFERENCES partners(partner_id), -- Link initiative to a partner
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Goals Table
CREATE TABLE goals (
    goal_id SERIAL PRIMARY KEY,
    initiative_id INTEGER REFERENCES initiatives(initiative_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    metric VARCHAR(255), -- e.g., "User Sign-ups"
    target_value INTEGER,
    current_value INTEGER DEFAULT 0,
    due_date DATE
);

-- Meeting Notes Table
CREATE TABLE meeting_notes (
    note_id SERIAL PRIMARY KEY,
    initiative_id INTEGER REFERENCES initiatives(initiative_id),
    partner_id INTEGER REFERENCES partners(partner_id),
    title VARCHAR(255) NOT NULL,
    notes TEXT,
    meeting_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Action Items Table
CREATE TABLE action_items (
    item_id SERIAL PRIMARY KEY,
    note_id INTEGER REFERENCES meeting_notes(note_id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    assignee_id INTEGER REFERENCES users(user_id),
    due_date DATE,
    is_completed BOOLEAN DEFAULT FALSE
);


-- #############################################################################
-- # Data Insertion
-- #############################################################################

-- Insert Users (Password for all is 'password123')
-- The hash is for 'password123'
INSERT INTO users (username, password_hash) VALUES
('admin', '$2a$10$T.A.x/E4yITp2zSUhMBNx.LhGj/T9iYqgRkMvG2QGfMh2wQdKx5hS'),
('csm_manager', '$2a$10$T.A.x/E4yITp2zSUhMBNx.LhGj/T9iYqgRkMvG2QGfMh2wQdKx5hS');

-- Insert Partners (Clients)
INSERT INTO partners (partner_id, name, contact_person, email, phone) VALUES
(1, 'Global Retail Inc.', 'Sarah Johnson', 's.johnson@globalretail.com', '555-0101'),
(2, 'TechDeploy Solutions', 'Mike Chen', 'm.chen@techdeploy.io', '555-0102'),
(3, 'National Telecom', 'David Rodriguez', 'd.rodriguez@nationaltel.net', '555-0103'),
(4, 'Innovate Logistics', 'Jessica Williams', 'j.williams@innovatelogistics.com', '555-0104'),
(5, 'Quantum Systems', 'Brian Miller', 'b.miller@quantumsys.tech', '555-0105');

-- Insert Initiatives
INSERT INTO initiatives (name, description, status, owner_id, partner_id, start_date, end_date) VALUES
('Q3 Buyer Onboarding Push', 'Strategic initiative to onboard 5 new enterprise buyers in Q3.', 'Planning', 2, NULL, '2025-07-01', '2025-09-30'),
('Improve Fill Rate for TechDeploy', 'Work with TechDeploy Solutions to increase their work order fill rate from 88% to 95%.', 'Active', 1, 2, '2025-06-15', '2025-10-15'),
('2025 POS System Rollout', 'Manage the nationwide rollout of new Point-of-Sale systems for Global Retail Inc.', 'Completed', 1, 1, '2025-01-10', '2025-07-20'),
('Network Upgrade for National Telecom', 'Oversee the technician deployment for a major network infrastructure upgrade.', 'Active', 2, 3, '2025-08-01', '2025-12-31'),
('Client Health Score Automation', 'Internal project to automate the calculation of client health scores.', 'Blocked', 1, NULL, '2025-05-01', '2025-08-30');

-- Insert Goals (linked to initiatives)
INSERT INTO goals (initiative_id, description, metric, target_value, current_value, due_date) VALUES
(2, 'Achieve 95% work order fill rate for TechDeploy', 'Fill Rate (%)', 95, 91, '2025-10-15'),
(3, 'Complete 1,000 POS installations', 'Installations', 1000, 1000, '2025-07-20'),
(4, 'Maintain an average CSAT of 4.5+ for National Telecom project', 'CSAT Score', 45, 47, '2025-12-31'),
(1, 'Sign 5 new enterprise contracts', 'Contracts Signed', 5, 2, '2025-09-30'),
(2, 'Reduce average time-to-fill by 1 day', 'Time-to-Fill (hours)', 48, 60, '2025-10-01');

-- Insert Meeting Notes
INSERT INTO meeting_notes (initiative_id, partner_id, title, notes, meeting_date) VALUES
(2, 2, 'Q3 Kick-off with TechDeploy', 'Discussed current fill rate challenges. Agreed on expanding technician coverage in the Midwest.', '2025-06-15 10:00:00'),
(3, 1, 'Final Rollout Review with Global Retail', 'Project successfully completed. Client is extremely satisfied with the execution.', '2025-07-22 14:00:00');

-- Insert Action Items (linked to meeting notes)
INSERT INTO action_items (note_id, description, assignee_id, due_date, is_completed) VALUES
(1, 'Provide TechDeploy with a list of available technicians in OH and MI.', 1, '2025-06-20', true),
(1, 'Schedule follow-up meeting for July 1st.', 2, '2025-06-18', true),
(2, 'Send final project report and invoice to Global Retail.', 1, '2025-07-25', false);