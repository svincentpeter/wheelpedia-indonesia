export interface Vehicle {
  id: string;
  brand: string;
  name: string;
  type: string;
  years: string;
  pcd: string;
  cb: string;
  nutSize: string;
  engine: string;
  tireSizes: { trim: string; size: string }[];
  image: string;
  description: string;
  aiInsight: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  date?: string;
  citations?: string[];
}

export interface ChatHistory {
  id: string;
  title: string;
  category: string;
  dateLabel: "Today" | "Previous 7 Days";
  messages: ChatMessage[];
}

export interface SavedTireSpec {
  id: string;
  name: string;
  width: number;
  aspect: number;
  construction: string;
  rim: number;
  loadIndex?: number;
  speedRating?: string;
  dateSaved: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
