export interface BackendEnvelope<T> {
  statusCode: number;
  data: T;
}
