import { NextResponse } from "next/server";
import { z, ZodType } from "zod";

export type ApiResponse<Res> =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "success";
      data: Res;
    };

export const executeApi =
  <Res, Req extends ZodType>(
    schema: Req,
    handler: (req: Request, body: z.infer<Req>) => Promise<Res>,
  ) =>
  async (req: Request) => {
    try {
      const payload = await req.json();
      const parsed = schema.parse(payload);
      const data = await handler(req, parsed);
      return NextResponse.json({
        type: "success",
        data: data,
      });
    } catch (err) {
      return NextResponse.json(
        { type: "error", message: (err as Error).message },
        {
          status: 500,
        },
      );
    }
  };

export const executeGetApi =
  <Res, Req extends ZodType>(
    schema: Req,
    handler: (req: Request, queryParams: z.infer<Req>) => Promise<Res>,
  ) =>
  async (req: Request) => {
    try {
      // 获取 URL 的搜索参数
      const url = new URL(req.url);
      const queryParams = Object.fromEntries(url.searchParams.entries());
      
      // 验证查询参数
      const parsed = schema.parse(queryParams);
      
      // 调用处理函数
      const data = await handler(req, parsed);

      // 返回成功响应
      return NextResponse.json({
        type: 'success',
        data: data,
      });
    } catch (err) {
      // 返回错误响应
      return NextResponse.json(
        { type: 'error', message: (err as Error).message },
        {
          status: 500,
        },
      );
    }
  };


// Function to convert a Blob object to base64 encoded string
// export function convertBlobToBase64(blob: Blob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
    
//     // Define the onload event to handle reader's read result
//     reader.onloadend = () => {
//       resolve(reader.result as string);
//     };

//     // Define the onerror event to handle any errors
//     reader.onerror = (error) => {
//       reject(error);
//     };

//     // Read the Blob (or File) as a data URL (base64)
//     reader.readAsDataURL(blob);
//   });
// }

// 导入需要的 Node.js 模块
const { Buffer } = require('buffer');

/**
 * 将 Blob 转换为 Base64 编码字符串
 * @param {Blob} blob - 要转换的 Blob 对象
 * @returns {Promise<string>} - 解析为 Base64 字符串的 Promise
 */
export function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    blob.arrayBuffer()
      .then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        const base64String = buffer.toString('base64');
        resolve(base64String);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Function to get the duration of an audio Blob
// export function getAudioDuration(blob: Blob): Promise<number> {
//   return new Promise((resolve, reject) => {
//     const audio = new Audio();
    
//     audio.onloadedmetadata = () => {
//       resolve(audio.duration);
//     };

//     audio.onerror = (event) => {
//       reject(`Error loading audio file: ${event}`);
//     };

//     // Create a URL for the Blob and set it as the audio source
//     const url = URL.createObjectURL(blob);
//     audio.src = url;
//   });
// }

export function getAudioDuration(base64Audio: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    // 当音频元数据加载完成时
    audio.onloadedmetadata = () => {
      resolve(audio.duration as number);
    };

    // 当音频文件加载出错时
    audio.onerror = (event) => {
      reject(`Error loading audio file: ${event}`);
    };

    // 将base64字符串转为data URL格式并设置为音频源
    audio.src = `data:audio/mp3;base64,${base64Audio}`;
  });
}