export interface ApiSuccessResponse<T = Record<string, unknown>> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: string;
}

export type ApiResponse<T = Record<string, unknown>> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

export interface GuestbookListData {
  entries: GuestbookResponseEntry[];
  total: number;
}

export interface GuestbookResponseEntry {
  timestamp: string;
  name: string;
  message: string;
}

export type GuestbookApiResponse = ApiResponse<GuestbookListData>;
export type RsvpApiResponse = ApiResponse<Record<string, never>>;
export type GuestbookSubmitResponse = ApiResponse<Record<string, never>>;

export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
