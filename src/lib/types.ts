export interface Car {
  id: number;
  make: string;
  model: string;
  variant: string;
  year: number;
  price_lakh: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  seats: number;
  mileage_kmpl: number | null;
  range_km: number | null;
  engine_cc: number | null;
  power_bhp: number;
  torque_nm: number;
  safety_rating: number;
  boot_space_litres: number;
  ground_clearance_mm: number;
  use_case: string[];
  target_buyer: string[];
  pros: string[];
  cons: string[];
  user_rating: number;
  review_count: number;
  image_url: string;
  colors: string[];
  warranty_years: number;
  service_cost_annual: number;
}

export interface ScoredCar {
  car: Car;
  match_score: number;
  match_reasons: string[];
  score_breakdown: {
    budget_score: number;
    safety_score: number;
    rating_score: number;
    mileage_score: number;
    use_case_score: number;
    target_buyer_score: number;
    priority_bonus: number;
    transmission_bonus: number;
  };
}

export interface RecommendResult {
  recommendations: ScoredCar[];
  preferences_used: RecommendationPreferences;
  total_evaluated: number;
}

export interface RecommendationPreferences {
  budget_min?: number;
  budget_max?: number;
  fuel_type?: string[];
  body_type?: string[];
  seats?: number;
  use_case?: string[];
  priorities?: string[];
  transmission?: string;
  target_buyer?: string[];
  top_n?: number;
}

export interface AnalyticsStats {
  summary: {
    total_cars: number;
    avg_price_lakh: number;
    min_price_lakh: number;
    max_price_lakh: number;
    avg_safety_rating: number;
    avg_user_rating: number;
    total_reviews: number;
  };
  fuel_distribution: { fuel_type: string; count: number }[];
  body_type_distribution: { body_type: string; count: number }[];
  price_buckets: { bucket: string; count: number }[];
}
