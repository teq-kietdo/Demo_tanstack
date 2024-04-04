import axios, { type AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const baseHeaders = (config: AxiosRequestConfig) => ({
  "Content-Type": "application/json",
  ...config.headers,
});

export interface ResData<T = string> {
  code: number;
  data: T;
  message: string;
}

export interface ErrorData<T = string> extends ResData<T> {
  status: number;
  statusText: string;
}

export interface MappedResponse<T = string> {
  data?: T;
  error?: AxiosError<ResData<T>> | ErrorData<T>;
}

// Config App Axios
const httpClient = axios.create();
httpClient.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

// Config App Axios
const httpAuth = axios.create();
httpAuth.defaults.baseURL = import.meta.env.VITE_APP_AUTH_URL;

// Config App Axios
const httpVideo = axios.create();
httpVideo.defaults.baseURL = import.meta.env.VITE_APP_VIDEO_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
httpVideo.interceptors.request.use((config: AxiosRequestConfig): any => {
  return {
    ...config,
    headers: {
      ...baseHeaders(config),
      Authorization: 'vldnA0UMR8KWNq6MBDpWkdL10kIAwWsGrGE8T53x5g8DuKlUBXNf9hgE'
    },
  };
});


// eslint-disable-next-line @typescript-eslint/no-explicit-any
httpClient.interceptors.request.use((config: AxiosRequestConfig): any => {
  return {
    ...config,
    headers: {
      ...baseHeaders(config),
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGY2ZmUzZjZjYzljZWI0ZTQ5ZDRkN2MzNmMwMGVhNyIsInN1YiI6IjY1ZjE1Y2Y3NmRlYTNhMDEyZjc3ZGQwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BWVFtrjTw9TPXzsngCe4oUnUCPvjld0fHK7PxwzReqw'

    },
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
httpAuth.interceptors.request.use((config: AxiosRequestConfig): any => {
  return {
    ...config,
    headers: {
      ...baseHeaders(config),
    },
  };
});

const setHeaderAppAxios = (token?: string): void => {
  if (!token) {
    if (localStorage.getItem("access_token")) {
      httpClient.defaults.headers.common = {
        Authorization: localStorage.getItem("access_token"),
      };
    }
    return;
  } else {
    httpClient.defaults.headers.common = {
      Authorization: token,
    };
  }
};

export async function requestHandler<T = string>(
  callApi: () => Promise<AxiosResponse<T>>
): Promise<MappedResponse<T>> {
  try {
    const { data }: AxiosResponse<T> = await callApi();
    return { data };
  } catch (e: unknown) {
    const mayAxiosError = e as AxiosError<ResData<T>>;
    if (
      mayAxiosError &&
      mayAxiosError.response &&
      mayAxiosError.response.data
    ) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw {
        ...mayAxiosError.response.data,
        status: mayAxiosError.response.status,
        statusText: mayAxiosError.response.statusText,
      };
    }
    return { error: mayAxiosError };
  }
}

export { httpClient, setHeaderAppAxios, httpAuth, httpVideo };
export default httpClient;
