import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

export interface HttpClient {
  get: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
  post: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
  put: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
  delete: (path: string, params: any) => Promise<void | AxiosResponse<any, any>>
}

export class APIClient implements HttpClient {
  static baseUrl: string =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:5001/teichaku-fa2a9/asia-northeast1"
      : "https://asia-northeast1-teichaku-fa2a9.cloudfunctions.net"

  public async get(path: string, params: any) {
    console.log({ baseUrl: APIClient.baseUrl, path, params })
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "get",
      params: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
    if (!res) throw new Error("no response!")
    return res
  }

  public async post(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "post",
      data: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })

    if (!res) throw new Error("no response!")
    if (res.status !== 200) throw new Error("status code is not 200")
    return res
  }

  public async put(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "put",
      data: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
    return res
  }

  public async delete(path: string, params: any) {
    const options: AxiosRequestConfig = {
      baseURL: APIClient.baseUrl,
      url: path,
      method: "delete",
      data: params,
    }

    const res: AxiosResponse | void = await axios(options).catch((e: AxiosError<{ error: string }>) => {
      console.log(e.message)
    })
    return res
  }
}
