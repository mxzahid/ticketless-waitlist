-- Add referral_code column to waitlist table
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Add referred_by column to track who referred this user
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referred_by TEXT;

-- Add referral_count column to track how many people each user has referred
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);

-- Generate unique referral codes for existing users
UPDATE waitlist 
SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT || email) FROM 1 FOR 8))
WHERE referral_code IS NULL;

-- Function to generate a unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate an 8-character alphanumeric code
    new_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM waitlist WHERE referral_code = new_code) INTO code_exists;
    
    -- If code doesn't exist, return it
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code on insert
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_referral_code ON waitlist;
CREATE TRIGGER trigger_set_referral_code
  BEFORE INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION set_referral_code();

-- Function to update referral count when someone signs up with a referral code
CREATE OR REPLACE FUNCTION update_referral_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referred_by IS NOT NULL THEN
    UPDATE waitlist 
    SET referral_count = referral_count + 1 
    WHERE referral_code = NEW.referred_by;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_referral_count ON waitlist;
CREATE TRIGGER trigger_update_referral_count
  AFTER INSERT ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_count();
