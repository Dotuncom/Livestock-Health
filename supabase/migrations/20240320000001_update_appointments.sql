-- Update appointments table with new fields
ALTER TABLE appointments
ADD COLUMN IF NOT EXISTS farmer_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS farmer_name TEXT,
ADD COLUMN IF NOT EXISTS farmer_phone TEXT,
ADD COLUMN IF NOT EXISTS animal_type TEXT,
ADD COLUMN IF NOT EXISTS urgency TEXT CHECK (urgency IN ('Normal', 'Emergency')),
ADD COLUMN IF NOT EXISTS reason TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS time_slot TEXT CHECK (time_slot IN ('morning', 'afternoon', 'evening')),
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rescheduled', 'completed', 'cancelled')),
ADD COLUMN IF NOT EXISTS rescheduled_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS rescheduled_time_slot TEXT CHECK (time_slot IN ('morning', 'afternoon', 'evening'));

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_appointments_farmer_id ON appointments(farmer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_vet_id ON appointments(vet_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);

-- Add RLS policies for appointments
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy for farmers to view their own appointments
CREATE POLICY "Farmers can view their own appointments"
ON appointments FOR SELECT
TO authenticated
USING (
  auth.uid() = farmer_id
);

-- Policy for farmers to create appointments
CREATE POLICY "Farmers can create appointments"
ON appointments FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = farmer_id
);

-- Policy for vets to view all appointments
CREATE POLICY "Vets can view all appointments"
ON appointments FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'vet'
  )
);

-- Policy for vets to update appointments
CREATE POLICY "Vets can update appointments"
ON appointments FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'vet'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.role = 'vet'
  )
);