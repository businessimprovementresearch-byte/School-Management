// @ts-nocheck
import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  AcademicYearListItemDto,
  AcademicYearResponseDto,
  AddClassHistoryDto,
  AddEnrollmentDto,
  AddParticipantDto,
  AddPhotoDto,
  AlbumDetailDto,
  AlbumListItemDto,
  AlertSettingDto,
  AssignTeacherDto,
  AttendanceControllerGetOverviewParams,
  AttendanceOverviewResponseDto,
  AwardIssuanceDto,
  AwardListItemDto,
  AwardsControllerFindIssuancesParams,
  BulkAttendanceDto,
  BulkAttendanceResponseDto,
  CheckAlertsResultDto,
  ClassDetailResponseDto,
  ClassHistoryResponseDto,
  ClassListItemDto,
  CompleteUploadDto,
  CompleteUploadResponseDto,
  CreateAcademicYearDto,
  CreateAlbumDto,
  CreateAwardDto,
  CreateEventDto,
  CreateEventGroupDto,
  CreateFeedbackDto,
  CreateMetricDto,
  CreateProgressDto,
  CreateSessionDto,
  CreateStudentDto,
  CreateTeacherDto,
  CreateTermDto,
  DashboardResponseDto,
  EnrollmentResponseDto,
  EventDetailDto,
  EventGroupDto,
  EventListItemDto,
  FeedbackResponseDto,
  FileUrlResponseDto,
  GalleryControllerFindAllAlbumsParams,
  GalleryPhotoDto,
  GenerateReportCardDto,
  IssueAwardDto,
  LoginDto,
  LoginResponseDto,
  MeResponseDto,
  MetricListItemDto,
  MetricResponseDto,
  MetricsControllerFindAllParams,
  NotificationDto,
  PresignedUploadDto,
  PresignedUploadResponseDto,
  ProgressControllerFindByStudentParams,
  ProgressListResponseDto,
  ProgressResponseDto,
  ReportCardResponseDto,
  ReportCardsControllerFindAllParams,
  SessionDetailResponseDto,
  SignupDto,
  SignupResponseDto,
  StudentDetailResponseDto,
  StudentListResponseDto,
  StudentsControllerFindAllParams,
  SuccessResponseDto,
  TeacherAssignmentResponseDto,
  TeacherDetailResponseDto,
  TeacherListItemDto,
  TermListItemDto,
  TermResponseDto,
  TermsControllerFindAllParams,
  UnreadCountDto,
  UpdateAcademicYearDto,
  UpdateAlertSettingDto,
  UpdateEnrollmentDto,
  UpdateEnrollmentResponseDto,
  UpdateEventDto,
  UpdateStudentDto,
  UpdateTeacherDto,
  UploadControllerGetFileUrlParams
} from './schemas';

import { customFetch } from '../customFetch';
import type { ErrorType , BodyType } from '../customFetch';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



export const getAuthControllerLoginUrl = () => {




  return `/api/auth/login`
}

export const authControllerLogin = async (loginDto: LoginDto, options?: RequestInit): Promise<LoginResponseDto> => {

  return customFetch<LoginResponseDto>(getAuthControllerLoginUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(loginDto)
  }
);}




export const getAuthControllerLoginMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,{data: BodyType<LoginDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,{data: BodyType<LoginDto>}, TContext> => {

const mutationKey = ['authControllerLogin'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerLogin>>, {data: BodyType<LoginDto>}> = (props) => {
          const {data} = props ?? {};

          return  authControllerLogin(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerLoginMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerLogin>>>
    export type AuthControllerLoginMutationBody = BodyType<LoginDto>
    export type AuthControllerLoginMutationError = ErrorType<unknown>

    export const useAuthControllerLogin = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerLogin>>, TError,{data: BodyType<LoginDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerLogin>>,
        TError,
        {data: BodyType<LoginDto>},
        TContext
      > => {
      return useMutation(getAuthControllerLoginMutationOptions(options), queryClient);
    }

export const getAuthControllerGetMeUrl = () => {




  return `/api/auth/me`
}

export const authControllerGetMe = async ( options?: RequestInit): Promise<MeResponseDto> => {

  return customFetch<MeResponseDto>(getAuthControllerGetMeUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getAuthControllerGetMeQueryKey = () => {
    return [
    `/api/auth/me`
    ] as const;
    }


export const getAuthControllerGetMeQueryOptions = <TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAuthControllerGetMeQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof authControllerGetMe>>> = ({ signal }) => authControllerGetMe({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AuthControllerGetMeQueryResult = NonNullable<Awaited<ReturnType<typeof authControllerGetMe>>>
export type AuthControllerGetMeQueryError = ErrorType<unknown>


export function useAuthControllerGetMe<TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof authControllerGetMe>>,
          TError,
          Awaited<ReturnType<typeof authControllerGetMe>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAuthControllerGetMe<TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof authControllerGetMe>>,
          TError,
          Awaited<ReturnType<typeof authControllerGetMe>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAuthControllerGetMe<TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAuthControllerGetMe<TData = Awaited<ReturnType<typeof authControllerGetMe>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof authControllerGetMe>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAuthControllerGetMeQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getAuthControllerSignupUrl = () => {




  return `/api/signup`
}

export const authControllerSignup = async (signupDto: SignupDto, options?: RequestInit): Promise<SignupResponseDto> => {

  return customFetch<SignupResponseDto>(getAuthControllerSignupUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(signupDto)
  }
);}




export const getAuthControllerSignupMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerSignup>>, TError,{data: BodyType<SignupDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof authControllerSignup>>, TError,{data: BodyType<SignupDto>}, TContext> => {

const mutationKey = ['authControllerSignup'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof authControllerSignup>>, {data: BodyType<SignupDto>}> = (props) => {
          const {data} = props ?? {};

          return  authControllerSignup(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AuthControllerSignupMutationResult = NonNullable<Awaited<ReturnType<typeof authControllerSignup>>>
    export type AuthControllerSignupMutationBody = BodyType<SignupDto>
    export type AuthControllerSignupMutationError = ErrorType<unknown>

    export const useAuthControllerSignup = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof authControllerSignup>>, TError,{data: BodyType<SignupDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof authControllerSignup>>,
        TError,
        {data: BodyType<SignupDto>},
        TContext
      > => {
      return useMutation(getAuthControllerSignupMutationOptions(options), queryClient);
    }

export const getUploadControllerGetPresignedUrlUrl = () => {




  return `/api/upload/presigned`
}

export const uploadControllerGetPresignedUrl = async (presignedUploadDto: PresignedUploadDto, options?: RequestInit): Promise<PresignedUploadResponseDto> => {

  return customFetch<PresignedUploadResponseDto>(getUploadControllerGetPresignedUrlUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(presignedUploadDto)
  }
);}




export const getUploadControllerGetPresignedUrlMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadControllerGetPresignedUrl>>, TError,{data: BodyType<PresignedUploadDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof uploadControllerGetPresignedUrl>>, TError,{data: BodyType<PresignedUploadDto>}, TContext> => {

const mutationKey = ['uploadControllerGetPresignedUrl'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadControllerGetPresignedUrl>>, {data: BodyType<PresignedUploadDto>}> = (props) => {
          const {data} = props ?? {};

          return  uploadControllerGetPresignedUrl(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UploadControllerGetPresignedUrlMutationResult = NonNullable<Awaited<ReturnType<typeof uploadControllerGetPresignedUrl>>>
    export type UploadControllerGetPresignedUrlMutationBody = BodyType<PresignedUploadDto>
    export type UploadControllerGetPresignedUrlMutationError = ErrorType<unknown>

    export const useUploadControllerGetPresignedUrl = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadControllerGetPresignedUrl>>, TError,{data: BodyType<PresignedUploadDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof uploadControllerGetPresignedUrl>>,
        TError,
        {data: BodyType<PresignedUploadDto>},
        TContext
      > => {
      return useMutation(getUploadControllerGetPresignedUrlMutationOptions(options), queryClient);
    }

export const getUploadControllerCompleteUploadUrl = () => {




  return `/api/upload/complete`
}

export const uploadControllerCompleteUpload = async (completeUploadDto: CompleteUploadDto, options?: RequestInit): Promise<CompleteUploadResponseDto> => {

  return customFetch<CompleteUploadResponseDto>(getUploadControllerCompleteUploadUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(completeUploadDto)
  }
);}




export const getUploadControllerCompleteUploadMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadControllerCompleteUpload>>, TError,{data: BodyType<CompleteUploadDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof uploadControllerCompleteUpload>>, TError,{data: BodyType<CompleteUploadDto>}, TContext> => {

const mutationKey = ['uploadControllerCompleteUpload'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadControllerCompleteUpload>>, {data: BodyType<CompleteUploadDto>}> = (props) => {
          const {data} = props ?? {};

          return  uploadControllerCompleteUpload(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UploadControllerCompleteUploadMutationResult = NonNullable<Awaited<ReturnType<typeof uploadControllerCompleteUpload>>>
    export type UploadControllerCompleteUploadMutationBody = BodyType<CompleteUploadDto>
    export type UploadControllerCompleteUploadMutationError = ErrorType<unknown>

    export const useUploadControllerCompleteUpload = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadControllerCompleteUpload>>, TError,{data: BodyType<CompleteUploadDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof uploadControllerCompleteUpload>>,
        TError,
        {data: BodyType<CompleteUploadDto>},
        TContext
      > => {
      return useMutation(getUploadControllerCompleteUploadMutationOptions(options), queryClient);
    }

export const getUploadControllerGetFileUrlUrl = (id: string,
    params: UploadControllerGetFileUrlParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/files/${id}/url?${stringifiedParams}` : `/api/files/${id}/url`
}

export const uploadControllerGetFileUrl = async (id: string,
    params: UploadControllerGetFileUrlParams, options?: RequestInit): Promise<FileUrlResponseDto> => {

  return customFetch<FileUrlResponseDto>(getUploadControllerGetFileUrlUrl(id,params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getUploadControllerGetFileUrlQueryKey = (id: string,
    params?: UploadControllerGetFileUrlParams,) => {
    return [
    `/api/files/${id}/url`, ...(params ? [params] : [])
    ] as const;
    }


export const getUploadControllerGetFileUrlQueryOptions = <TData = Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError = ErrorType<unknown>>(id: string,
    params: UploadControllerGetFileUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getUploadControllerGetFileUrlQueryKey(id,params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>> = ({ signal }) => uploadControllerGetFileUrl(id,params, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type UploadControllerGetFileUrlQueryResult = NonNullable<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>>
export type UploadControllerGetFileUrlQueryError = ErrorType<unknown>


export function useUploadControllerGetFileUrl<TData = Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError = ErrorType<unknown>>(
 id: string,
    params: UploadControllerGetFileUrlParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof uploadControllerGetFileUrl>>,
          TError,
          Awaited<ReturnType<typeof uploadControllerGetFileUrl>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUploadControllerGetFileUrl<TData = Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError = ErrorType<unknown>>(
 id: string,
    params: UploadControllerGetFileUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof uploadControllerGetFileUrl>>,
          TError,
          Awaited<ReturnType<typeof uploadControllerGetFileUrl>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useUploadControllerGetFileUrl<TData = Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError = ErrorType<unknown>>(
 id: string,
    params: UploadControllerGetFileUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useUploadControllerGetFileUrl<TData = Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError = ErrorType<unknown>>(
 id: string,
    params: UploadControllerGetFileUrlParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof uploadControllerGetFileUrl>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getUploadControllerGetFileUrlQueryOptions(id,params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getUploadControllerDeleteFileUrl = (id: string,) => {




  return `/api/files/${id}`
}

export const uploadControllerDeleteFile = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getUploadControllerDeleteFileUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getUploadControllerDeleteFileMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadControllerDeleteFile>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof uploadControllerDeleteFile>>, TError,{id: string}, TContext> => {

const mutationKey = ['uploadControllerDeleteFile'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof uploadControllerDeleteFile>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  uploadControllerDeleteFile(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type UploadControllerDeleteFileMutationResult = NonNullable<Awaited<ReturnType<typeof uploadControllerDeleteFile>>>

    export type UploadControllerDeleteFileMutationError = ErrorType<unknown>

    export const useUploadControllerDeleteFile = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof uploadControllerDeleteFile>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof uploadControllerDeleteFile>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getUploadControllerDeleteFileMutationOptions(options), queryClient);
    }

export const getStudentsControllerFindAllUrl = (params?: StudentsControllerFindAllParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/students?${stringifiedParams}` : `/api/students`
}

export const studentsControllerFindAll = async (params?: StudentsControllerFindAllParams, options?: RequestInit): Promise<StudentListResponseDto> => {

  return customFetch<StudentListResponseDto>(getStudentsControllerFindAllUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getStudentsControllerFindAllQueryKey = (params?: StudentsControllerFindAllParams,) => {
    return [
    `/api/students`, ...(params ? [params] : [])
    ] as const;
    }


export const getStudentsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof studentsControllerFindAll>>, TError = ErrorType<unknown>>(params?: StudentsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getStudentsControllerFindAllQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof studentsControllerFindAll>>> = ({ signal }) => studentsControllerFindAll(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type StudentsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof studentsControllerFindAll>>>
export type StudentsControllerFindAllQueryError = ErrorType<unknown>


export function useStudentsControllerFindAll<TData = Awaited<ReturnType<typeof studentsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  StudentsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof studentsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof studentsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStudentsControllerFindAll<TData = Awaited<ReturnType<typeof studentsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: StudentsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof studentsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof studentsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStudentsControllerFindAll<TData = Awaited<ReturnType<typeof studentsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: StudentsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useStudentsControllerFindAll<TData = Awaited<ReturnType<typeof studentsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: StudentsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getStudentsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getStudentsControllerCreateUrl = () => {




  return `/api/students`
}

export const studentsControllerCreate = async (createStudentDto: CreateStudentDto, options?: RequestInit): Promise<StudentDetailResponseDto> => {

  return customFetch<StudentDetailResponseDto>(getStudentsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createStudentDto)
  }
);}




export const getStudentsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerCreate>>, TError,{data: BodyType<CreateStudentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerCreate>>, TError,{data: BodyType<CreateStudentDto>}, TContext> => {

const mutationKey = ['studentsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerCreate>>, {data: BodyType<CreateStudentDto>}> = (props) => {
          const {data} = props ?? {};

          return  studentsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerCreate>>>
    export type StudentsControllerCreateMutationBody = BodyType<CreateStudentDto>
    export type StudentsControllerCreateMutationError = ErrorType<unknown>

    export const useStudentsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerCreate>>, TError,{data: BodyType<CreateStudentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerCreate>>,
        TError,
        {data: BodyType<CreateStudentDto>},
        TContext
      > => {
      return useMutation(getStudentsControllerCreateMutationOptions(options), queryClient);
    }

export const getStudentsControllerFindOneUrl = (id: string,) => {




  return `/api/students/${id}`
}

export const studentsControllerFindOne = async (id: string, options?: RequestInit): Promise<StudentDetailResponseDto> => {

  return customFetch<StudentDetailResponseDto>(getStudentsControllerFindOneUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getStudentsControllerFindOneQueryKey = (id: string,) => {
    return [
    `/api/students/${id}`
    ] as const;
    }


export const getStudentsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof studentsControllerFindOne>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getStudentsControllerFindOneQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof studentsControllerFindOne>>> = ({ signal }) => studentsControllerFindOne(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type StudentsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof studentsControllerFindOne>>>
export type StudentsControllerFindOneQueryError = ErrorType<unknown>


export function useStudentsControllerFindOne<TData = Awaited<ReturnType<typeof studentsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof studentsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof studentsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStudentsControllerFindOne<TData = Awaited<ReturnType<typeof studentsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof studentsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof studentsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useStudentsControllerFindOne<TData = Awaited<ReturnType<typeof studentsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useStudentsControllerFindOne<TData = Awaited<ReturnType<typeof studentsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof studentsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getStudentsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getStudentsControllerUpdateUrl = (id: string,) => {




  return `/api/students/${id}`
}

export const studentsControllerUpdate = async (id: string,
    updateStudentDto: UpdateStudentDto, options?: RequestInit): Promise<StudentDetailResponseDto> => {

  return customFetch<StudentDetailResponseDto>(getStudentsControllerUpdateUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateStudentDto)
  }
);}




export const getStudentsControllerUpdateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateStudentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateStudentDto>}, TContext> => {

const mutationKey = ['studentsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerUpdate>>, {id: string;data: BodyType<UpdateStudentDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  studentsControllerUpdate(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerUpdate>>>
    export type StudentsControllerUpdateMutationBody = BodyType<UpdateStudentDto>
    export type StudentsControllerUpdateMutationError = ErrorType<unknown>

    export const useStudentsControllerUpdate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateStudentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerUpdate>>,
        TError,
        {id: string;data: BodyType<UpdateStudentDto>},
        TContext
      > => {
      return useMutation(getStudentsControllerUpdateMutationOptions(options), queryClient);
    }

export const getStudentsControllerRemoveUrl = (id: string,) => {




  return `/api/students/${id}`
}

export const studentsControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getStudentsControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getStudentsControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['studentsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  studentsControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerRemove>>>

    export type StudentsControllerRemoveMutationError = ErrorType<unknown>

    export const useStudentsControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getStudentsControllerRemoveMutationOptions(options), queryClient);
    }

export const getStudentsControllerAddEnrollmentUrl = (studentId: string,) => {




  return `/api/students/${studentId}/enrollments`
}

export const studentsControllerAddEnrollment = async (studentId: string,
    addEnrollmentDto: AddEnrollmentDto, options?: RequestInit): Promise<EnrollmentResponseDto> => {

  return customFetch<EnrollmentResponseDto>(getStudentsControllerAddEnrollmentUrl(studentId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(addEnrollmentDto)
  }
);}




export const getStudentsControllerAddEnrollmentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerAddEnrollment>>, TError,{studentId: string;data: BodyType<AddEnrollmentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerAddEnrollment>>, TError,{studentId: string;data: BodyType<AddEnrollmentDto>}, TContext> => {

const mutationKey = ['studentsControllerAddEnrollment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerAddEnrollment>>, {studentId: string;data: BodyType<AddEnrollmentDto>}> = (props) => {
          const {studentId,data} = props ?? {};

          return  studentsControllerAddEnrollment(studentId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerAddEnrollmentMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerAddEnrollment>>>
    export type StudentsControllerAddEnrollmentMutationBody = BodyType<AddEnrollmentDto>
    export type StudentsControllerAddEnrollmentMutationError = ErrorType<unknown>

    export const useStudentsControllerAddEnrollment = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerAddEnrollment>>, TError,{studentId: string;data: BodyType<AddEnrollmentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerAddEnrollment>>,
        TError,
        {studentId: string;data: BodyType<AddEnrollmentDto>},
        TContext
      > => {
      return useMutation(getStudentsControllerAddEnrollmentMutationOptions(options), queryClient);
    }

export const getStudentsControllerUpdateEnrollmentUrl = (id: string,) => {




  return `/api/enrollments/${id}`
}

export const studentsControllerUpdateEnrollment = async (id: string,
    updateEnrollmentDto: UpdateEnrollmentDto, options?: RequestInit): Promise<UpdateEnrollmentResponseDto> => {

  return customFetch<UpdateEnrollmentResponseDto>(getStudentsControllerUpdateEnrollmentUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateEnrollmentDto)
  }
);}




export const getStudentsControllerUpdateEnrollmentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerUpdateEnrollment>>, TError,{id: string;data: BodyType<UpdateEnrollmentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerUpdateEnrollment>>, TError,{id: string;data: BodyType<UpdateEnrollmentDto>}, TContext> => {

const mutationKey = ['studentsControllerUpdateEnrollment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerUpdateEnrollment>>, {id: string;data: BodyType<UpdateEnrollmentDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  studentsControllerUpdateEnrollment(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerUpdateEnrollmentMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerUpdateEnrollment>>>
    export type StudentsControllerUpdateEnrollmentMutationBody = BodyType<UpdateEnrollmentDto>
    export type StudentsControllerUpdateEnrollmentMutationError = ErrorType<unknown>

    export const useStudentsControllerUpdateEnrollment = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerUpdateEnrollment>>, TError,{id: string;data: BodyType<UpdateEnrollmentDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerUpdateEnrollment>>,
        TError,
        {id: string;data: BodyType<UpdateEnrollmentDto>},
        TContext
      > => {
      return useMutation(getStudentsControllerUpdateEnrollmentMutationOptions(options), queryClient);
    }

export const getStudentsControllerDeleteEnrollmentUrl = (id: string,) => {




  return `/api/enrollments/${id}`
}

export const studentsControllerDeleteEnrollment = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getStudentsControllerDeleteEnrollmentUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getStudentsControllerDeleteEnrollmentMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerDeleteEnrollment>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerDeleteEnrollment>>, TError,{id: string}, TContext> => {

const mutationKey = ['studentsControllerDeleteEnrollment'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerDeleteEnrollment>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  studentsControllerDeleteEnrollment(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerDeleteEnrollmentMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerDeleteEnrollment>>>

    export type StudentsControllerDeleteEnrollmentMutationError = ErrorType<unknown>

    export const useStudentsControllerDeleteEnrollment = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerDeleteEnrollment>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerDeleteEnrollment>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getStudentsControllerDeleteEnrollmentMutationOptions(options), queryClient);
    }

export const getStudentsControllerAddClassHistoryUrl = (studentId: string,) => {




  return `/api/students/${studentId}/history`
}

export const studentsControllerAddClassHistory = async (studentId: string,
    addClassHistoryDto: AddClassHistoryDto, options?: RequestInit): Promise<ClassHistoryResponseDto> => {

  return customFetch<ClassHistoryResponseDto>(getStudentsControllerAddClassHistoryUrl(studentId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(addClassHistoryDto)
  }
);}




export const getStudentsControllerAddClassHistoryMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerAddClassHistory>>, TError,{studentId: string;data: BodyType<AddClassHistoryDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof studentsControllerAddClassHistory>>, TError,{studentId: string;data: BodyType<AddClassHistoryDto>}, TContext> => {

const mutationKey = ['studentsControllerAddClassHistory'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof studentsControllerAddClassHistory>>, {studentId: string;data: BodyType<AddClassHistoryDto>}> = (props) => {
          const {studentId,data} = props ?? {};

          return  studentsControllerAddClassHistory(studentId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type StudentsControllerAddClassHistoryMutationResult = NonNullable<Awaited<ReturnType<typeof studentsControllerAddClassHistory>>>
    export type StudentsControllerAddClassHistoryMutationBody = BodyType<AddClassHistoryDto>
    export type StudentsControllerAddClassHistoryMutationError = ErrorType<unknown>

    export const useStudentsControllerAddClassHistory = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof studentsControllerAddClassHistory>>, TError,{studentId: string;data: BodyType<AddClassHistoryDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof studentsControllerAddClassHistory>>,
        TError,
        {studentId: string;data: BodyType<AddClassHistoryDto>},
        TContext
      > => {
      return useMutation(getStudentsControllerAddClassHistoryMutationOptions(options), queryClient);
    }

export const getClassesControllerFindAllUrl = () => {




  return `/api/classes`
}

export const classesControllerFindAll = async ( options?: RequestInit): Promise<ClassListItemDto[]> => {

  return customFetch<ClassListItemDto[]>(getClassesControllerFindAllUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getClassesControllerFindAllQueryKey = () => {
    return [
    `/api/classes`
    ] as const;
    }


export const getClassesControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassesControllerFindAllQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof classesControllerFindAll>>> = ({ signal }) => classesControllerFindAll({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassesControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof classesControllerFindAll>>>
export type ClassesControllerFindAllQueryError = ErrorType<unknown>


export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useClassesControllerFindAll<TData = Awaited<ReturnType<typeof classesControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassesControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getClassesControllerFindOneUrl = (id: string,) => {




  return `/api/classes/${id}`
}

export const classesControllerFindOne = async (id: string, options?: RequestInit): Promise<ClassDetailResponseDto> => {

  return customFetch<ClassDetailResponseDto>(getClassesControllerFindOneUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getClassesControllerFindOneQueryKey = (id: string,) => {
    return [
    `/api/classes/${id}`
    ] as const;
    }


export const getClassesControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getClassesControllerFindOneQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof classesControllerFindOne>>> = ({ signal }) => classesControllerFindOne(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ClassesControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof classesControllerFindOne>>>
export type ClassesControllerFindOneQueryError = ErrorType<unknown>


export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof classesControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof classesControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useClassesControllerFindOne<TData = Awaited<ReturnType<typeof classesControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof classesControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getClassesControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getClassesControllerAssignTeacherUrl = (classId: string,) => {




  return `/api/classes/${classId}/teachers`
}

export const classesControllerAssignTeacher = async (classId: string,
    assignTeacherDto: AssignTeacherDto, options?: RequestInit): Promise<TeacherAssignmentResponseDto> => {

  return customFetch<TeacherAssignmentResponseDto>(getClassesControllerAssignTeacherUrl(classId),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(assignTeacherDto)
  }
);}




export const getClassesControllerAssignTeacherMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerAssignTeacher>>, TError,{classId: string;data: BodyType<AssignTeacherDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerAssignTeacher>>, TError,{classId: string;data: BodyType<AssignTeacherDto>}, TContext> => {

const mutationKey = ['classesControllerAssignTeacher'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerAssignTeacher>>, {classId: string;data: BodyType<AssignTeacherDto>}> = (props) => {
          const {classId,data} = props ?? {};

          return  classesControllerAssignTeacher(classId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerAssignTeacherMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerAssignTeacher>>>
    export type ClassesControllerAssignTeacherMutationBody = BodyType<AssignTeacherDto>
    export type ClassesControllerAssignTeacherMutationError = ErrorType<unknown>

    export const useClassesControllerAssignTeacher = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerAssignTeacher>>, TError,{classId: string;data: BodyType<AssignTeacherDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerAssignTeacher>>,
        TError,
        {classId: string;data: BodyType<AssignTeacherDto>},
        TContext
      > => {
      return useMutation(getClassesControllerAssignTeacherMutationOptions(options), queryClient);
    }

export const getClassesControllerRemoveTeacherUrl = (classId: string,
    teacherId: string,) => {




  return `/api/classes/${classId}/teachers/${teacherId}`
}

export const classesControllerRemoveTeacher = async (classId: string,
    teacherId: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getClassesControllerRemoveTeacherUrl(classId,teacherId),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getClassesControllerRemoveTeacherMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemoveTeacher>>, TError,{classId: string;teacherId: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemoveTeacher>>, TError,{classId: string;teacherId: string}, TContext> => {

const mutationKey = ['classesControllerRemoveTeacher'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof classesControllerRemoveTeacher>>, {classId: string;teacherId: string}> = (props) => {
          const {classId,teacherId} = props ?? {};

          return  classesControllerRemoveTeacher(classId,teacherId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ClassesControllerRemoveTeacherMutationResult = NonNullable<Awaited<ReturnType<typeof classesControllerRemoveTeacher>>>

    export type ClassesControllerRemoveTeacherMutationError = ErrorType<unknown>

    export const useClassesControllerRemoveTeacher = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof classesControllerRemoveTeacher>>, TError,{classId: string;teacherId: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof classesControllerRemoveTeacher>>,
        TError,
        {classId: string;teacherId: string},
        TContext
      > => {
      return useMutation(getClassesControllerRemoveTeacherMutationOptions(options), queryClient);
    }

export const getTeachersControllerFindAllUrl = () => {




  return `/api/teachers`
}

export const teachersControllerFindAll = async ( options?: RequestInit): Promise<TeacherListItemDto[]> => {

  return customFetch<TeacherListItemDto[]>(getTeachersControllerFindAllUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getTeachersControllerFindAllQueryKey = () => {
    return [
    `/api/teachers`
    ] as const;
    }


export const getTeachersControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof teachersControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTeachersControllerFindAllQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof teachersControllerFindAll>>> = ({ signal }) => teachersControllerFindAll({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TeachersControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof teachersControllerFindAll>>>
export type TeachersControllerFindAllQueryError = ErrorType<unknown>


export function useTeachersControllerFindAll<TData = Awaited<ReturnType<typeof teachersControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof teachersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof teachersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTeachersControllerFindAll<TData = Awaited<ReturnType<typeof teachersControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof teachersControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof teachersControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTeachersControllerFindAll<TData = Awaited<ReturnType<typeof teachersControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useTeachersControllerFindAll<TData = Awaited<ReturnType<typeof teachersControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTeachersControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getTeachersControllerCreateUrl = () => {




  return `/api/teachers`
}

export const teachersControllerCreate = async (createTeacherDto: CreateTeacherDto, options?: RequestInit): Promise<TeacherDetailResponseDto> => {

  return customFetch<TeacherDetailResponseDto>(getTeachersControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createTeacherDto)
  }
);}




export const getTeachersControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof teachersControllerCreate>>, TError,{data: BodyType<CreateTeacherDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof teachersControllerCreate>>, TError,{data: BodyType<CreateTeacherDto>}, TContext> => {

const mutationKey = ['teachersControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof teachersControllerCreate>>, {data: BodyType<CreateTeacherDto>}> = (props) => {
          const {data} = props ?? {};

          return  teachersControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type TeachersControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof teachersControllerCreate>>>
    export type TeachersControllerCreateMutationBody = BodyType<CreateTeacherDto>
    export type TeachersControllerCreateMutationError = ErrorType<unknown>

    export const useTeachersControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof teachersControllerCreate>>, TError,{data: BodyType<CreateTeacherDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof teachersControllerCreate>>,
        TError,
        {data: BodyType<CreateTeacherDto>},
        TContext
      > => {
      return useMutation(getTeachersControllerCreateMutationOptions(options), queryClient);
    }

export const getTeachersControllerFindOneUrl = (id: string,) => {




  return `/api/teachers/${id}`
}

export const teachersControllerFindOne = async (id: string, options?: RequestInit): Promise<TeacherDetailResponseDto> => {

  return customFetch<TeacherDetailResponseDto>(getTeachersControllerFindOneUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getTeachersControllerFindOneQueryKey = (id: string,) => {
    return [
    `/api/teachers/${id}`
    ] as const;
    }


export const getTeachersControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof teachersControllerFindOne>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTeachersControllerFindOneQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof teachersControllerFindOne>>> = ({ signal }) => teachersControllerFindOne(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TeachersControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof teachersControllerFindOne>>>
export type TeachersControllerFindOneQueryError = ErrorType<unknown>


export function useTeachersControllerFindOne<TData = Awaited<ReturnType<typeof teachersControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof teachersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof teachersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTeachersControllerFindOne<TData = Awaited<ReturnType<typeof teachersControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof teachersControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof teachersControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTeachersControllerFindOne<TData = Awaited<ReturnType<typeof teachersControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useTeachersControllerFindOne<TData = Awaited<ReturnType<typeof teachersControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof teachersControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTeachersControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getTeachersControllerUpdateUrl = (id: string,) => {




  return `/api/teachers/${id}`
}

export const teachersControllerUpdate = async (id: string,
    updateTeacherDto: UpdateTeacherDto, options?: RequestInit): Promise<TeacherDetailResponseDto> => {

  return customFetch<TeacherDetailResponseDto>(getTeachersControllerUpdateUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateTeacherDto)
  }
);}




export const getTeachersControllerUpdateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof teachersControllerUpdate>>, TError,{id: string;data: BodyType<UpdateTeacherDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof teachersControllerUpdate>>, TError,{id: string;data: BodyType<UpdateTeacherDto>}, TContext> => {

const mutationKey = ['teachersControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof teachersControllerUpdate>>, {id: string;data: BodyType<UpdateTeacherDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  teachersControllerUpdate(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type TeachersControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof teachersControllerUpdate>>>
    export type TeachersControllerUpdateMutationBody = BodyType<UpdateTeacherDto>
    export type TeachersControllerUpdateMutationError = ErrorType<unknown>

    export const useTeachersControllerUpdate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof teachersControllerUpdate>>, TError,{id: string;data: BodyType<UpdateTeacherDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof teachersControllerUpdate>>,
        TError,
        {id: string;data: BodyType<UpdateTeacherDto>},
        TContext
      > => {
      return useMutation(getTeachersControllerUpdateMutationOptions(options), queryClient);
    }

export const getTeachersControllerRemoveUrl = (id: string,) => {




  return `/api/teachers/${id}`
}

export const teachersControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getTeachersControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getTeachersControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof teachersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof teachersControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['teachersControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof teachersControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  teachersControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type TeachersControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof teachersControllerRemove>>>

    export type TeachersControllerRemoveMutationError = ErrorType<unknown>

    export const useTeachersControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof teachersControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof teachersControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getTeachersControllerRemoveMutationOptions(options), queryClient);
    }

export const getSessionsControllerCreateUrl = () => {




  return `/api/sessions`
}

export const sessionsControllerCreate = async (createSessionDto: CreateSessionDto, options?: RequestInit): Promise<SessionDetailResponseDto> => {

  return customFetch<SessionDetailResponseDto>(getSessionsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createSessionDto)
  }
);}




export const getSessionsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof sessionsControllerCreate>>, TError,{data: BodyType<CreateSessionDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof sessionsControllerCreate>>, TError,{data: BodyType<CreateSessionDto>}, TContext> => {

const mutationKey = ['sessionsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof sessionsControllerCreate>>, {data: BodyType<CreateSessionDto>}> = (props) => {
          const {data} = props ?? {};

          return  sessionsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type SessionsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof sessionsControllerCreate>>>
    export type SessionsControllerCreateMutationBody = BodyType<CreateSessionDto>
    export type SessionsControllerCreateMutationError = ErrorType<unknown>

    export const useSessionsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof sessionsControllerCreate>>, TError,{data: BodyType<CreateSessionDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof sessionsControllerCreate>>,
        TError,
        {data: BodyType<CreateSessionDto>},
        TContext
      > => {
      return useMutation(getSessionsControllerCreateMutationOptions(options), queryClient);
    }

export const getSessionsControllerFindOneUrl = (id: string,) => {




  return `/api/sessions/${id}`
}

export const sessionsControllerFindOne = async (id: string, options?: RequestInit): Promise<SessionDetailResponseDto> => {

  return customFetch<SessionDetailResponseDto>(getSessionsControllerFindOneUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getSessionsControllerFindOneQueryKey = (id: string,) => {
    return [
    `/api/sessions/${id}`
    ] as const;
    }


export const getSessionsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getSessionsControllerFindOneQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof sessionsControllerFindOne>>> = ({ signal }) => sessionsControllerFindOne(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type SessionsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof sessionsControllerFindOne>>>
export type SessionsControllerFindOneQueryError = ErrorType<unknown>


export function useSessionsControllerFindOne<TData = Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof sessionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof sessionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSessionsControllerFindOne<TData = Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof sessionsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof sessionsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useSessionsControllerFindOne<TData = Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useSessionsControllerFindOne<TData = Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof sessionsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getSessionsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getSessionsControllerRemoveUrl = (id: string,) => {




  return `/api/sessions/${id}`
}

export const sessionsControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getSessionsControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getSessionsControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof sessionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof sessionsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['sessionsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof sessionsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  sessionsControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type SessionsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof sessionsControllerRemove>>>

    export type SessionsControllerRemoveMutationError = ErrorType<unknown>

    export const useSessionsControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof sessionsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof sessionsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getSessionsControllerRemoveMutationOptions(options), queryClient);
    }

export const getAttendanceControllerBulkSaveUrl = () => {




  return `/api/attendance/bulk`
}

export const attendanceControllerBulkSave = async (bulkAttendanceDto: BulkAttendanceDto, options?: RequestInit): Promise<BulkAttendanceResponseDto> => {

  return customFetch<BulkAttendanceResponseDto>(getAttendanceControllerBulkSaveUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(bulkAttendanceDto)
  }
);}




export const getAttendanceControllerBulkSaveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof attendanceControllerBulkSave>>, TError,{data: BodyType<BulkAttendanceDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof attendanceControllerBulkSave>>, TError,{data: BodyType<BulkAttendanceDto>}, TContext> => {

const mutationKey = ['attendanceControllerBulkSave'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof attendanceControllerBulkSave>>, {data: BodyType<BulkAttendanceDto>}> = (props) => {
          const {data} = props ?? {};

          return  attendanceControllerBulkSave(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AttendanceControllerBulkSaveMutationResult = NonNullable<Awaited<ReturnType<typeof attendanceControllerBulkSave>>>
    export type AttendanceControllerBulkSaveMutationBody = BodyType<BulkAttendanceDto>
    export type AttendanceControllerBulkSaveMutationError = ErrorType<unknown>

    export const useAttendanceControllerBulkSave = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof attendanceControllerBulkSave>>, TError,{data: BodyType<BulkAttendanceDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof attendanceControllerBulkSave>>,
        TError,
        {data: BodyType<BulkAttendanceDto>},
        TContext
      > => {
      return useMutation(getAttendanceControllerBulkSaveMutationOptions(options), queryClient);
    }

export const getAttendanceControllerGetOverviewUrl = (params: AttendanceControllerGetOverviewParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/attendance/overview?${stringifiedParams}` : `/api/attendance/overview`
}

export const attendanceControllerGetOverview = async (params: AttendanceControllerGetOverviewParams, options?: RequestInit): Promise<AttendanceOverviewResponseDto> => {

  return customFetch<AttendanceOverviewResponseDto>(getAttendanceControllerGetOverviewUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getAttendanceControllerGetOverviewQueryKey = (params?: AttendanceControllerGetOverviewParams,) => {
    return [
    `/api/attendance/overview`, ...(params ? [params] : [])
    ] as const;
    }


export const getAttendanceControllerGetOverviewQueryOptions = <TData = Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError = ErrorType<unknown>>(params: AttendanceControllerGetOverviewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAttendanceControllerGetOverviewQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof attendanceControllerGetOverview>>> = ({ signal }) => attendanceControllerGetOverview(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AttendanceControllerGetOverviewQueryResult = NonNullable<Awaited<ReturnType<typeof attendanceControllerGetOverview>>>
export type AttendanceControllerGetOverviewQueryError = ErrorType<unknown>


export function useAttendanceControllerGetOverview<TData = Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError = ErrorType<unknown>>(
 params: AttendanceControllerGetOverviewParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof attendanceControllerGetOverview>>,
          TError,
          Awaited<ReturnType<typeof attendanceControllerGetOverview>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAttendanceControllerGetOverview<TData = Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError = ErrorType<unknown>>(
 params: AttendanceControllerGetOverviewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof attendanceControllerGetOverview>>,
          TError,
          Awaited<ReturnType<typeof attendanceControllerGetOverview>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAttendanceControllerGetOverview<TData = Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError = ErrorType<unknown>>(
 params: AttendanceControllerGetOverviewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAttendanceControllerGetOverview<TData = Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError = ErrorType<unknown>>(
 params: AttendanceControllerGetOverviewParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof attendanceControllerGetOverview>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAttendanceControllerGetOverviewQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getFeedbackControllerCreateUrl = () => {




  return `/api/feedback`
}

export const feedbackControllerCreate = async (createFeedbackDto: CreateFeedbackDto, options?: RequestInit): Promise<FeedbackResponseDto> => {

  return customFetch<FeedbackResponseDto>(getFeedbackControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createFeedbackDto)
  }
);}




export const getFeedbackControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof feedbackControllerCreate>>, TError,{data: BodyType<CreateFeedbackDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof feedbackControllerCreate>>, TError,{data: BodyType<CreateFeedbackDto>}, TContext> => {

const mutationKey = ['feedbackControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof feedbackControllerCreate>>, {data: BodyType<CreateFeedbackDto>}> = (props) => {
          const {data} = props ?? {};

          return  feedbackControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type FeedbackControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof feedbackControllerCreate>>>
    export type FeedbackControllerCreateMutationBody = BodyType<CreateFeedbackDto>
    export type FeedbackControllerCreateMutationError = ErrorType<unknown>

    export const useFeedbackControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof feedbackControllerCreate>>, TError,{data: BodyType<CreateFeedbackDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof feedbackControllerCreate>>,
        TError,
        {data: BodyType<CreateFeedbackDto>},
        TContext
      > => {
      return useMutation(getFeedbackControllerCreateMutationOptions(options), queryClient);
    }

export const getProgressControllerCreateUrl = () => {




  return `/api/progress`
}

export const progressControllerCreate = async (createProgressDto: CreateProgressDto, options?: RequestInit): Promise<ProgressResponseDto> => {

  return customFetch<ProgressResponseDto>(getProgressControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createProgressDto)
  }
);}




export const getProgressControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof progressControllerCreate>>, TError,{data: BodyType<CreateProgressDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof progressControllerCreate>>, TError,{data: BodyType<CreateProgressDto>}, TContext> => {

const mutationKey = ['progressControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof progressControllerCreate>>, {data: BodyType<CreateProgressDto>}> = (props) => {
          const {data} = props ?? {};

          return  progressControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ProgressControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof progressControllerCreate>>>
    export type ProgressControllerCreateMutationBody = BodyType<CreateProgressDto>
    export type ProgressControllerCreateMutationError = ErrorType<unknown>

    export const useProgressControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof progressControllerCreate>>, TError,{data: BodyType<CreateProgressDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof progressControllerCreate>>,
        TError,
        {data: BodyType<CreateProgressDto>},
        TContext
      > => {
      return useMutation(getProgressControllerCreateMutationOptions(options), queryClient);
    }

export const getProgressControllerFindByStudentUrl = (params: ProgressControllerFindByStudentParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/progress?${stringifiedParams}` : `/api/progress`
}

export const progressControllerFindByStudent = async (params: ProgressControllerFindByStudentParams, options?: RequestInit): Promise<ProgressListResponseDto> => {

  return customFetch<ProgressListResponseDto>(getProgressControllerFindByStudentUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getProgressControllerFindByStudentQueryKey = (params?: ProgressControllerFindByStudentParams,) => {
    return [
    `/api/progress`, ...(params ? [params] : [])
    ] as const;
    }


export const getProgressControllerFindByStudentQueryOptions = <TData = Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError = ErrorType<unknown>>(params: ProgressControllerFindByStudentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getProgressControllerFindByStudentQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof progressControllerFindByStudent>>> = ({ signal }) => progressControllerFindByStudent(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ProgressControllerFindByStudentQueryResult = NonNullable<Awaited<ReturnType<typeof progressControllerFindByStudent>>>
export type ProgressControllerFindByStudentQueryError = ErrorType<unknown>


export function useProgressControllerFindByStudent<TData = Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError = ErrorType<unknown>>(
 params: ProgressControllerFindByStudentParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof progressControllerFindByStudent>>,
          TError,
          Awaited<ReturnType<typeof progressControllerFindByStudent>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useProgressControllerFindByStudent<TData = Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError = ErrorType<unknown>>(
 params: ProgressControllerFindByStudentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof progressControllerFindByStudent>>,
          TError,
          Awaited<ReturnType<typeof progressControllerFindByStudent>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useProgressControllerFindByStudent<TData = Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError = ErrorType<unknown>>(
 params: ProgressControllerFindByStudentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useProgressControllerFindByStudent<TData = Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError = ErrorType<unknown>>(
 params: ProgressControllerFindByStudentParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof progressControllerFindByStudent>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getProgressControllerFindByStudentQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getDashboardControllerGetDashboardUrl = () => {




  return `/api/dashboard`
}

export const dashboardControllerGetDashboard = async ( options?: RequestInit): Promise<DashboardResponseDto> => {

  return customFetch<DashboardResponseDto>(getDashboardControllerGetDashboardUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getDashboardControllerGetDashboardQueryKey = () => {
    return [
    `/api/dashboard`
    ] as const;
    }


export const getDashboardControllerGetDashboardQueryOptions = <TData = Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getDashboardControllerGetDashboardQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>> = ({ signal }) => dashboardControllerGetDashboard({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type DashboardControllerGetDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>>
export type DashboardControllerGetDashboardQueryError = ErrorType<unknown>


export function useDashboardControllerGetDashboard<TData = Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof dashboardControllerGetDashboard>>,
          TError,
          Awaited<ReturnType<typeof dashboardControllerGetDashboard>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDashboardControllerGetDashboard<TData = Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof dashboardControllerGetDashboard>>,
          TError,
          Awaited<ReturnType<typeof dashboardControllerGetDashboard>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useDashboardControllerGetDashboard<TData = Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useDashboardControllerGetDashboard<TData = Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof dashboardControllerGetDashboard>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getDashboardControllerGetDashboardQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getAcademicYearsControllerFindAllUrl = () => {




  return `/api/academic-years`
}

export const academicYearsControllerFindAll = async ( options?: RequestInit): Promise<AcademicYearListItemDto[]> => {

  return customFetch<AcademicYearListItemDto[]>(getAcademicYearsControllerFindAllUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getAcademicYearsControllerFindAllQueryKey = () => {
    return [
    `/api/academic-years`
    ] as const;
    }


export const getAcademicYearsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAcademicYearsControllerFindAllQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof academicYearsControllerFindAll>>> = ({ signal }) => academicYearsControllerFindAll({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AcademicYearsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof academicYearsControllerFindAll>>>
export type AcademicYearsControllerFindAllQueryError = ErrorType<unknown>


export function useAcademicYearsControllerFindAll<TData = Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof academicYearsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof academicYearsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAcademicYearsControllerFindAll<TData = Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof academicYearsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof academicYearsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAcademicYearsControllerFindAll<TData = Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAcademicYearsControllerFindAll<TData = Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof academicYearsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAcademicYearsControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getAcademicYearsControllerCreateUrl = () => {




  return `/api/academic-years`
}

export const academicYearsControllerCreate = async (createAcademicYearDto: CreateAcademicYearDto, options?: RequestInit): Promise<AcademicYearResponseDto> => {

  return customFetch<AcademicYearResponseDto>(getAcademicYearsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createAcademicYearDto)
  }
);}




export const getAcademicYearsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof academicYearsControllerCreate>>, TError,{data: BodyType<CreateAcademicYearDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof academicYearsControllerCreate>>, TError,{data: BodyType<CreateAcademicYearDto>}, TContext> => {

const mutationKey = ['academicYearsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof academicYearsControllerCreate>>, {data: BodyType<CreateAcademicYearDto>}> = (props) => {
          const {data} = props ?? {};

          return  academicYearsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AcademicYearsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof academicYearsControllerCreate>>>
    export type AcademicYearsControllerCreateMutationBody = BodyType<CreateAcademicYearDto>
    export type AcademicYearsControllerCreateMutationError = ErrorType<unknown>

    export const useAcademicYearsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof academicYearsControllerCreate>>, TError,{data: BodyType<CreateAcademicYearDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof academicYearsControllerCreate>>,
        TError,
        {data: BodyType<CreateAcademicYearDto>},
        TContext
      > => {
      return useMutation(getAcademicYearsControllerCreateMutationOptions(options), queryClient);
    }

export const getAcademicYearsControllerUpdateUrl = (id: string,) => {




  return `/api/academic-years/${id}`
}

export const academicYearsControllerUpdate = async (id: string,
    updateAcademicYearDto: UpdateAcademicYearDto, options?: RequestInit): Promise<AcademicYearResponseDto> => {

  return customFetch<AcademicYearResponseDto>(getAcademicYearsControllerUpdateUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateAcademicYearDto)
  }
);}




export const getAcademicYearsControllerUpdateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof academicYearsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateAcademicYearDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof academicYearsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateAcademicYearDto>}, TContext> => {

const mutationKey = ['academicYearsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof academicYearsControllerUpdate>>, {id: string;data: BodyType<UpdateAcademicYearDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  academicYearsControllerUpdate(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AcademicYearsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof academicYearsControllerUpdate>>>
    export type AcademicYearsControllerUpdateMutationBody = BodyType<UpdateAcademicYearDto>
    export type AcademicYearsControllerUpdateMutationError = ErrorType<unknown>

    export const useAcademicYearsControllerUpdate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof academicYearsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateAcademicYearDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof academicYearsControllerUpdate>>,
        TError,
        {id: string;data: BodyType<UpdateAcademicYearDto>},
        TContext
      > => {
      return useMutation(getAcademicYearsControllerUpdateMutationOptions(options), queryClient);
    }

export const getTermsControllerFindAllUrl = (params?: TermsControllerFindAllParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/terms?${stringifiedParams}` : `/api/terms`
}

export const termsControllerFindAll = async (params?: TermsControllerFindAllParams, options?: RequestInit): Promise<TermListItemDto[]> => {

  return customFetch<TermListItemDto[]>(getTermsControllerFindAllUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getTermsControllerFindAllQueryKey = (params?: TermsControllerFindAllParams,) => {
    return [
    `/api/terms`, ...(params ? [params] : [])
    ] as const;
    }


export const getTermsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof termsControllerFindAll>>, TError = ErrorType<unknown>>(params?: TermsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof termsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getTermsControllerFindAllQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof termsControllerFindAll>>> = ({ signal }) => termsControllerFindAll(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof termsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type TermsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof termsControllerFindAll>>>
export type TermsControllerFindAllQueryError = ErrorType<unknown>


export function useTermsControllerFindAll<TData = Awaited<ReturnType<typeof termsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  TermsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof termsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof termsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof termsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTermsControllerFindAll<TData = Awaited<ReturnType<typeof termsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: TermsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof termsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof termsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof termsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useTermsControllerFindAll<TData = Awaited<ReturnType<typeof termsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: TermsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof termsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useTermsControllerFindAll<TData = Awaited<ReturnType<typeof termsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: TermsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof termsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getTermsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getTermsControllerCreateUrl = () => {




  return `/api/terms`
}

export const termsControllerCreate = async (createTermDto: CreateTermDto, options?: RequestInit): Promise<TermResponseDto> => {

  return customFetch<TermResponseDto>(getTermsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createTermDto)
  }
);}




export const getTermsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof termsControllerCreate>>, TError,{data: BodyType<CreateTermDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof termsControllerCreate>>, TError,{data: BodyType<CreateTermDto>}, TContext> => {

const mutationKey = ['termsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof termsControllerCreate>>, {data: BodyType<CreateTermDto>}> = (props) => {
          const {data} = props ?? {};

          return  termsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type TermsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof termsControllerCreate>>>
    export type TermsControllerCreateMutationBody = BodyType<CreateTermDto>
    export type TermsControllerCreateMutationError = ErrorType<unknown>

    export const useTermsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof termsControllerCreate>>, TError,{data: BodyType<CreateTermDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof termsControllerCreate>>,
        TError,
        {data: BodyType<CreateTermDto>},
        TContext
      > => {
      return useMutation(getTermsControllerCreateMutationOptions(options), queryClient);
    }

export const getTermsControllerRemoveUrl = (id: string,) => {




  return `/api/terms/${id}`
}

export const termsControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getTermsControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getTermsControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof termsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof termsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['termsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof termsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  termsControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type TermsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof termsControllerRemove>>>

    export type TermsControllerRemoveMutationError = ErrorType<unknown>

    export const useTermsControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof termsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof termsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getTermsControllerRemoveMutationOptions(options), queryClient);
    }

export const getMetricsControllerFindAllUrl = (params?: MetricsControllerFindAllParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/metrics?${stringifiedParams}` : `/api/metrics`
}

export const metricsControllerFindAll = async (params?: MetricsControllerFindAllParams, options?: RequestInit): Promise<MetricListItemDto[]> => {

  return customFetch<MetricListItemDto[]>(getMetricsControllerFindAllUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getMetricsControllerFindAllQueryKey = (params?: MetricsControllerFindAllParams,) => {
    return [
    `/api/metrics`, ...(params ? [params] : [])
    ] as const;
    }


export const getMetricsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof metricsControllerFindAll>>, TError = ErrorType<unknown>>(params?: MetricsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof metricsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getMetricsControllerFindAllQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof metricsControllerFindAll>>> = ({ signal }) => metricsControllerFindAll(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof metricsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type MetricsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof metricsControllerFindAll>>>
export type MetricsControllerFindAllQueryError = ErrorType<unknown>


export function useMetricsControllerFindAll<TData = Awaited<ReturnType<typeof metricsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: undefined |  MetricsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof metricsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof metricsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof metricsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useMetricsControllerFindAll<TData = Awaited<ReturnType<typeof metricsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: MetricsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof metricsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof metricsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof metricsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useMetricsControllerFindAll<TData = Awaited<ReturnType<typeof metricsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: MetricsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof metricsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useMetricsControllerFindAll<TData = Awaited<ReturnType<typeof metricsControllerFindAll>>, TError = ErrorType<unknown>>(
 params?: MetricsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof metricsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getMetricsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getMetricsControllerCreateUrl = () => {




  return `/api/metrics`
}

export const metricsControllerCreate = async (createMetricDto: CreateMetricDto, options?: RequestInit): Promise<MetricResponseDto> => {

  return customFetch<MetricResponseDto>(getMetricsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createMetricDto)
  }
);}




export const getMetricsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof metricsControllerCreate>>, TError,{data: BodyType<CreateMetricDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof metricsControllerCreate>>, TError,{data: BodyType<CreateMetricDto>}, TContext> => {

const mutationKey = ['metricsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof metricsControllerCreate>>, {data: BodyType<CreateMetricDto>}> = (props) => {
          const {data} = props ?? {};

          return  metricsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type MetricsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof metricsControllerCreate>>>
    export type MetricsControllerCreateMutationBody = BodyType<CreateMetricDto>
    export type MetricsControllerCreateMutationError = ErrorType<unknown>

    export const useMetricsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof metricsControllerCreate>>, TError,{data: BodyType<CreateMetricDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof metricsControllerCreate>>,
        TError,
        {data: BodyType<CreateMetricDto>},
        TContext
      > => {
      return useMutation(getMetricsControllerCreateMutationOptions(options), queryClient);
    }

export const getMetricsControllerRemoveUrl = (id: string,) => {




  return `/api/metrics/${id}`
}

export const metricsControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getMetricsControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getMetricsControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof metricsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof metricsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['metricsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof metricsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  metricsControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type MetricsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof metricsControllerRemove>>>

    export type MetricsControllerRemoveMutationError = ErrorType<unknown>

    export const useMetricsControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof metricsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof metricsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getMetricsControllerRemoveMutationOptions(options), queryClient);
    }

export const getReportCardsControllerGenerateUrl = () => {




  return `/api/report-cards/generate`
}

export const reportCardsControllerGenerate = async (generateReportCardDto: GenerateReportCardDto, options?: RequestInit): Promise<ReportCardResponseDto> => {

  return customFetch<ReportCardResponseDto>(getReportCardsControllerGenerateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(generateReportCardDto)
  }
);}




export const getReportCardsControllerGenerateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof reportCardsControllerGenerate>>, TError,{data: BodyType<GenerateReportCardDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof reportCardsControllerGenerate>>, TError,{data: BodyType<GenerateReportCardDto>}, TContext> => {

const mutationKey = ['reportCardsControllerGenerate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof reportCardsControllerGenerate>>, {data: BodyType<GenerateReportCardDto>}> = (props) => {
          const {data} = props ?? {};

          return  reportCardsControllerGenerate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type ReportCardsControllerGenerateMutationResult = NonNullable<Awaited<ReturnType<typeof reportCardsControllerGenerate>>>
    export type ReportCardsControllerGenerateMutationBody = BodyType<GenerateReportCardDto>
    export type ReportCardsControllerGenerateMutationError = ErrorType<unknown>

    export const useReportCardsControllerGenerate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof reportCardsControllerGenerate>>, TError,{data: BodyType<GenerateReportCardDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof reportCardsControllerGenerate>>,
        TError,
        {data: BodyType<GenerateReportCardDto>},
        TContext
      > => {
      return useMutation(getReportCardsControllerGenerateMutationOptions(options), queryClient);
    }

export const getReportCardsControllerFindAllUrl = (params: ReportCardsControllerFindAllParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/report-cards?${stringifiedParams}` : `/api/report-cards`
}

export const reportCardsControllerFindAll = async (params: ReportCardsControllerFindAllParams, options?: RequestInit): Promise<ReportCardResponseDto[]> => {

  return customFetch<ReportCardResponseDto[]>(getReportCardsControllerFindAllUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getReportCardsControllerFindAllQueryKey = (params?: ReportCardsControllerFindAllParams,) => {
    return [
    `/api/report-cards`, ...(params ? [params] : [])
    ] as const;
    }


export const getReportCardsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError = ErrorType<unknown>>(params: ReportCardsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getReportCardsControllerFindAllQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof reportCardsControllerFindAll>>> = ({ signal }) => reportCardsControllerFindAll(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ReportCardsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof reportCardsControllerFindAll>>>
export type ReportCardsControllerFindAllQueryError = ErrorType<unknown>


export function useReportCardsControllerFindAll<TData = Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: ReportCardsControllerFindAllParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof reportCardsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof reportCardsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useReportCardsControllerFindAll<TData = Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: ReportCardsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof reportCardsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof reportCardsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useReportCardsControllerFindAll<TData = Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: ReportCardsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useReportCardsControllerFindAll<TData = Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError = ErrorType<unknown>>(
 params: ReportCardsControllerFindAllParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getReportCardsControllerFindAllQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getReportCardsControllerGetDownloadUrl = (id: string,) => {




  return `/api/report-cards/${id}/download`
}

export const reportCardsControllerGetDownload = async (id: string, options?: RequestInit): Promise<FileUrlResponseDto> => {

  return customFetch<FileUrlResponseDto>(getReportCardsControllerGetDownloadUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getReportCardsControllerGetDownloadQueryKey = (id: string,) => {
    return [
    `/api/report-cards/${id}/download`
    ] as const;
    }


export const getReportCardsControllerGetDownloadQueryOptions = <TData = Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getReportCardsControllerGetDownloadQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>> = ({ signal }) => reportCardsControllerGetDownload(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type ReportCardsControllerGetDownloadQueryResult = NonNullable<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>>
export type ReportCardsControllerGetDownloadQueryError = ErrorType<unknown>


export function useReportCardsControllerGetDownload<TData = Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof reportCardsControllerGetDownload>>,
          TError,
          Awaited<ReturnType<typeof reportCardsControllerGetDownload>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useReportCardsControllerGetDownload<TData = Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof reportCardsControllerGetDownload>>,
          TError,
          Awaited<ReturnType<typeof reportCardsControllerGetDownload>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useReportCardsControllerGetDownload<TData = Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useReportCardsControllerGetDownload<TData = Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof reportCardsControllerGetDownload>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getReportCardsControllerGetDownloadQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getEventsControllerFindAllUrl = () => {




  return `/api/events`
}

export const eventsControllerFindAll = async ( options?: RequestInit): Promise<EventListItemDto[]> => {

  return customFetch<EventListItemDto[]>(getEventsControllerFindAllUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getEventsControllerFindAllQueryKey = () => {
    return [
    `/api/events`
    ] as const;
    }


export const getEventsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof eventsControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getEventsControllerFindAllQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof eventsControllerFindAll>>> = ({ signal }) => eventsControllerFindAll({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type EventsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof eventsControllerFindAll>>>
export type EventsControllerFindAllQueryError = ErrorType<unknown>


export function useEventsControllerFindAll<TData = Awaited<ReturnType<typeof eventsControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof eventsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof eventsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useEventsControllerFindAll<TData = Awaited<ReturnType<typeof eventsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof eventsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof eventsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useEventsControllerFindAll<TData = Awaited<ReturnType<typeof eventsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useEventsControllerFindAll<TData = Awaited<ReturnType<typeof eventsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getEventsControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getEventsControllerCreateUrl = () => {




  return `/api/events`
}

export const eventsControllerCreate = async (createEventDto: CreateEventDto, options?: RequestInit): Promise<EventListItemDto> => {

  return customFetch<EventListItemDto>(getEventsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createEventDto)
  }
);}




export const getEventsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerCreate>>, TError,{data: BodyType<CreateEventDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerCreate>>, TError,{data: BodyType<CreateEventDto>}, TContext> => {

const mutationKey = ['eventsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerCreate>>, {data: BodyType<CreateEventDto>}> = (props) => {
          const {data} = props ?? {};

          return  eventsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerCreate>>>
    export type EventsControllerCreateMutationBody = BodyType<CreateEventDto>
    export type EventsControllerCreateMutationError = ErrorType<unknown>

    export const useEventsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerCreate>>, TError,{data: BodyType<CreateEventDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerCreate>>,
        TError,
        {data: BodyType<CreateEventDto>},
        TContext
      > => {
      return useMutation(getEventsControllerCreateMutationOptions(options), queryClient);
    }

export const getEventsControllerFindOneUrl = (id: string,) => {




  return `/api/events/${id}`
}

export const eventsControllerFindOne = async (id: string, options?: RequestInit): Promise<EventDetailDto> => {

  return customFetch<EventDetailDto>(getEventsControllerFindOneUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getEventsControllerFindOneQueryKey = (id: string,) => {
    return [
    `/api/events/${id}`
    ] as const;
    }


export const getEventsControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof eventsControllerFindOne>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getEventsControllerFindOneQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof eventsControllerFindOne>>> = ({ signal }) => eventsControllerFindOne(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindOne>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type EventsControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof eventsControllerFindOne>>>
export type EventsControllerFindOneQueryError = ErrorType<unknown>


export function useEventsControllerFindOne<TData = Awaited<ReturnType<typeof eventsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindOne>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof eventsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof eventsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useEventsControllerFindOne<TData = Awaited<ReturnType<typeof eventsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindOne>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof eventsControllerFindOne>>,
          TError,
          Awaited<ReturnType<typeof eventsControllerFindOne>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useEventsControllerFindOne<TData = Awaited<ReturnType<typeof eventsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useEventsControllerFindOne<TData = Awaited<ReturnType<typeof eventsControllerFindOne>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof eventsControllerFindOne>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getEventsControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getEventsControllerUpdateUrl = (id: string,) => {




  return `/api/events/${id}`
}

export const eventsControllerUpdate = async (id: string,
    updateEventDto: UpdateEventDto, options?: RequestInit): Promise<EventListItemDto> => {

  return customFetch<EventListItemDto>(getEventsControllerUpdateUrl(id),
  {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateEventDto)
  }
);}




export const getEventsControllerUpdateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateEventDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateEventDto>}, TContext> => {

const mutationKey = ['eventsControllerUpdate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerUpdate>>, {id: string;data: BodyType<UpdateEventDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  eventsControllerUpdate(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerUpdate>>>
    export type EventsControllerUpdateMutationBody = BodyType<UpdateEventDto>
    export type EventsControllerUpdateMutationError = ErrorType<unknown>

    export const useEventsControllerUpdate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerUpdate>>, TError,{id: string;data: BodyType<UpdateEventDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerUpdate>>,
        TError,
        {id: string;data: BodyType<UpdateEventDto>},
        TContext
      > => {
      return useMutation(getEventsControllerUpdateMutationOptions(options), queryClient);
    }

export const getEventsControllerRemoveUrl = (id: string,) => {




  return `/api/events/${id}`
}

export const eventsControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getEventsControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getEventsControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['eventsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  eventsControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerRemove>>>

    export type EventsControllerRemoveMutationError = ErrorType<unknown>

    export const useEventsControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getEventsControllerRemoveMutationOptions(options), queryClient);
    }

export const getEventsControllerCreateGroupUrl = (id: string,) => {




  return `/api/events/${id}/groups`
}

export const eventsControllerCreateGroup = async (id: string,
    createEventGroupDto: CreateEventGroupDto, options?: RequestInit): Promise<EventGroupDto> => {

  return customFetch<EventGroupDto>(getEventsControllerCreateGroupUrl(id),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createEventGroupDto)
  }
);}




export const getEventsControllerCreateGroupMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerCreateGroup>>, TError,{id: string;data: BodyType<CreateEventGroupDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerCreateGroup>>, TError,{id: string;data: BodyType<CreateEventGroupDto>}, TContext> => {

const mutationKey = ['eventsControllerCreateGroup'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerCreateGroup>>, {id: string;data: BodyType<CreateEventGroupDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  eventsControllerCreateGroup(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerCreateGroupMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerCreateGroup>>>
    export type EventsControllerCreateGroupMutationBody = BodyType<CreateEventGroupDto>
    export type EventsControllerCreateGroupMutationError = ErrorType<unknown>

    export const useEventsControllerCreateGroup = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerCreateGroup>>, TError,{id: string;data: BodyType<CreateEventGroupDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerCreateGroup>>,
        TError,
        {id: string;data: BodyType<CreateEventGroupDto>},
        TContext
      > => {
      return useMutation(getEventsControllerCreateGroupMutationOptions(options), queryClient);
    }

export const getEventsControllerRemoveGroupUrl = (groupId: string,) => {




  return `/api/events/groups/${groupId}`
}

export const eventsControllerRemoveGroup = async (groupId: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getEventsControllerRemoveGroupUrl(groupId),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getEventsControllerRemoveGroupMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemoveGroup>>, TError,{groupId: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemoveGroup>>, TError,{groupId: string}, TContext> => {

const mutationKey = ['eventsControllerRemoveGroup'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerRemoveGroup>>, {groupId: string}> = (props) => {
          const {groupId} = props ?? {};

          return  eventsControllerRemoveGroup(groupId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerRemoveGroupMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerRemoveGroup>>>

    export type EventsControllerRemoveGroupMutationError = ErrorType<unknown>

    export const useEventsControllerRemoveGroup = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemoveGroup>>, TError,{groupId: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerRemoveGroup>>,
        TError,
        {groupId: string},
        TContext
      > => {
      return useMutation(getEventsControllerRemoveGroupMutationOptions(options), queryClient);
    }

export const getEventsControllerAddParticipantUrl = (id: string,) => {




  return `/api/events/${id}/participants`
}

export const eventsControllerAddParticipant = async (id: string,
    addParticipantDto: AddParticipantDto, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getEventsControllerAddParticipantUrl(id),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(addParticipantDto)
  }
);}




export const getEventsControllerAddParticipantMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerAddParticipant>>, TError,{id: string;data: BodyType<AddParticipantDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerAddParticipant>>, TError,{id: string;data: BodyType<AddParticipantDto>}, TContext> => {

const mutationKey = ['eventsControllerAddParticipant'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerAddParticipant>>, {id: string;data: BodyType<AddParticipantDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  eventsControllerAddParticipant(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerAddParticipantMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerAddParticipant>>>
    export type EventsControllerAddParticipantMutationBody = BodyType<AddParticipantDto>
    export type EventsControllerAddParticipantMutationError = ErrorType<unknown>

    export const useEventsControllerAddParticipant = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerAddParticipant>>, TError,{id: string;data: BodyType<AddParticipantDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerAddParticipant>>,
        TError,
        {id: string;data: BodyType<AddParticipantDto>},
        TContext
      > => {
      return useMutation(getEventsControllerAddParticipantMutationOptions(options), queryClient);
    }

export const getEventsControllerRemoveParticipantUrl = (participantId: string,) => {




  return `/api/events/participants/${participantId}`
}

export const eventsControllerRemoveParticipant = async (participantId: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getEventsControllerRemoveParticipantUrl(participantId),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getEventsControllerRemoveParticipantMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemoveParticipant>>, TError,{participantId: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemoveParticipant>>, TError,{participantId: string}, TContext> => {

const mutationKey = ['eventsControllerRemoveParticipant'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof eventsControllerRemoveParticipant>>, {participantId: string}> = (props) => {
          const {participantId} = props ?? {};

          return  eventsControllerRemoveParticipant(participantId,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type EventsControllerRemoveParticipantMutationResult = NonNullable<Awaited<ReturnType<typeof eventsControllerRemoveParticipant>>>

    export type EventsControllerRemoveParticipantMutationError = ErrorType<unknown>

    export const useEventsControllerRemoveParticipant = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof eventsControllerRemoveParticipant>>, TError,{participantId: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof eventsControllerRemoveParticipant>>,
        TError,
        {participantId: string},
        TContext
      > => {
      return useMutation(getEventsControllerRemoveParticipantMutationOptions(options), queryClient);
    }

export const getAwardsControllerFindAllUrl = () => {




  return `/api/awards`
}

export const awardsControllerFindAll = async ( options?: RequestInit): Promise<AwardListItemDto[]> => {

  return customFetch<AwardListItemDto[]>(getAwardsControllerFindAllUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getAwardsControllerFindAllQueryKey = () => {
    return [
    `/api/awards`
    ] as const;
    }


export const getAwardsControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof awardsControllerFindAll>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAwardsControllerFindAllQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof awardsControllerFindAll>>> = ({ signal }) => awardsControllerFindAll({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindAll>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AwardsControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof awardsControllerFindAll>>>
export type AwardsControllerFindAllQueryError = ErrorType<unknown>


export function useAwardsControllerFindAll<TData = Awaited<ReturnType<typeof awardsControllerFindAll>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindAll>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof awardsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof awardsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAwardsControllerFindAll<TData = Awaited<ReturnType<typeof awardsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindAll>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof awardsControllerFindAll>>,
          TError,
          Awaited<ReturnType<typeof awardsControllerFindAll>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAwardsControllerFindAll<TData = Awaited<ReturnType<typeof awardsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAwardsControllerFindAll<TData = Awaited<ReturnType<typeof awardsControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindAll>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAwardsControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getAwardsControllerCreateUrl = () => {




  return `/api/awards`
}

export const awardsControllerCreate = async (createAwardDto: CreateAwardDto, options?: RequestInit): Promise<AwardListItemDto> => {

  return customFetch<AwardListItemDto>(getAwardsControllerCreateUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createAwardDto)
  }
);}




export const getAwardsControllerCreateMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerCreate>>, TError,{data: BodyType<CreateAwardDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof awardsControllerCreate>>, TError,{data: BodyType<CreateAwardDto>}, TContext> => {

const mutationKey = ['awardsControllerCreate'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof awardsControllerCreate>>, {data: BodyType<CreateAwardDto>}> = (props) => {
          const {data} = props ?? {};

          return  awardsControllerCreate(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AwardsControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof awardsControllerCreate>>>
    export type AwardsControllerCreateMutationBody = BodyType<CreateAwardDto>
    export type AwardsControllerCreateMutationError = ErrorType<unknown>

    export const useAwardsControllerCreate = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerCreate>>, TError,{data: BodyType<CreateAwardDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof awardsControllerCreate>>,
        TError,
        {data: BodyType<CreateAwardDto>},
        TContext
      > => {
      return useMutation(getAwardsControllerCreateMutationOptions(options), queryClient);
    }

export const getAwardsControllerFindIssuancesUrl = (params?: AwardsControllerFindIssuancesParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/awards/issuances?${stringifiedParams}` : `/api/awards/issuances`
}

export const awardsControllerFindIssuances = async (params?: AwardsControllerFindIssuancesParams, options?: RequestInit): Promise<AwardIssuanceDto[]> => {

  return customFetch<AwardIssuanceDto[]>(getAwardsControllerFindIssuancesUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getAwardsControllerFindIssuancesQueryKey = (params?: AwardsControllerFindIssuancesParams,) => {
    return [
    `/api/awards/issuances`, ...(params ? [params] : [])
    ] as const;
    }


export const getAwardsControllerFindIssuancesQueryOptions = <TData = Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError = ErrorType<unknown>>(params?: AwardsControllerFindIssuancesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAwardsControllerFindIssuancesQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof awardsControllerFindIssuances>>> = ({ signal }) => awardsControllerFindIssuances(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type AwardsControllerFindIssuancesQueryResult = NonNullable<Awaited<ReturnType<typeof awardsControllerFindIssuances>>>
export type AwardsControllerFindIssuancesQueryError = ErrorType<unknown>


export function useAwardsControllerFindIssuances<TData = Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError = ErrorType<unknown>>(
 params: undefined |  AwardsControllerFindIssuancesParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof awardsControllerFindIssuances>>,
          TError,
          Awaited<ReturnType<typeof awardsControllerFindIssuances>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAwardsControllerFindIssuances<TData = Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError = ErrorType<unknown>>(
 params?: AwardsControllerFindIssuancesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof awardsControllerFindIssuances>>,
          TError,
          Awaited<ReturnType<typeof awardsControllerFindIssuances>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useAwardsControllerFindIssuances<TData = Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError = ErrorType<unknown>>(
 params?: AwardsControllerFindIssuancesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useAwardsControllerFindIssuances<TData = Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError = ErrorType<unknown>>(
 params?: AwardsControllerFindIssuancesParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof awardsControllerFindIssuances>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getAwardsControllerFindIssuancesQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getAwardsControllerRemoveUrl = (id: string,) => {




  return `/api/awards/${id}`
}

export const awardsControllerRemove = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getAwardsControllerRemoveUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getAwardsControllerRemoveMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof awardsControllerRemove>>, TError,{id: string}, TContext> => {

const mutationKey = ['awardsControllerRemove'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof awardsControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  awardsControllerRemove(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AwardsControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof awardsControllerRemove>>>

    export type AwardsControllerRemoveMutationError = ErrorType<unknown>

    export const useAwardsControllerRemove = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof awardsControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getAwardsControllerRemoveMutationOptions(options), queryClient);
    }

export const getAwardsControllerIssueUrl = () => {




  return `/api/awards/issue`
}

export const awardsControllerIssue = async (issueAwardDto: IssueAwardDto, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getAwardsControllerIssueUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(issueAwardDto)
  }
);}




export const getAwardsControllerIssueMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerIssue>>, TError,{data: BodyType<IssueAwardDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof awardsControllerIssue>>, TError,{data: BodyType<IssueAwardDto>}, TContext> => {

const mutationKey = ['awardsControllerIssue'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof awardsControllerIssue>>, {data: BodyType<IssueAwardDto>}> = (props) => {
          const {data} = props ?? {};

          return  awardsControllerIssue(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AwardsControllerIssueMutationResult = NonNullable<Awaited<ReturnType<typeof awardsControllerIssue>>>
    export type AwardsControllerIssueMutationBody = BodyType<IssueAwardDto>
    export type AwardsControllerIssueMutationError = ErrorType<unknown>

    export const useAwardsControllerIssue = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerIssue>>, TError,{data: BodyType<IssueAwardDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof awardsControllerIssue>>,
        TError,
        {data: BodyType<IssueAwardDto>},
        TContext
      > => {
      return useMutation(getAwardsControllerIssueMutationOptions(options), queryClient);
    }

export const getAwardsControllerRemoveIssuanceUrl = (id: string,) => {




  return `/api/awards/issuances/${id}`
}

export const awardsControllerRemoveIssuance = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getAwardsControllerRemoveIssuanceUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getAwardsControllerRemoveIssuanceMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerRemoveIssuance>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof awardsControllerRemoveIssuance>>, TError,{id: string}, TContext> => {

const mutationKey = ['awardsControllerRemoveIssuance'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof awardsControllerRemoveIssuance>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  awardsControllerRemoveIssuance(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AwardsControllerRemoveIssuanceMutationResult = NonNullable<Awaited<ReturnType<typeof awardsControllerRemoveIssuance>>>

    export type AwardsControllerRemoveIssuanceMutationError = ErrorType<unknown>

    export const useAwardsControllerRemoveIssuance = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof awardsControllerRemoveIssuance>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof awardsControllerRemoveIssuance>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getAwardsControllerRemoveIssuanceMutationOptions(options), queryClient);
    }

export const getGalleryControllerFindAllAlbumsUrl = (params?: GalleryControllerFindAllAlbumsParams,) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {

    if (value !== undefined) {
      normalizedParams.append(key, value === null ? 'null' : String(value))
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0 ? `/api/gallery/albums?${stringifiedParams}` : `/api/gallery/albums`
}

export const galleryControllerFindAllAlbums = async (params?: GalleryControllerFindAllAlbumsParams, options?: RequestInit): Promise<AlbumListItemDto[]> => {

  return customFetch<AlbumListItemDto[]>(getGalleryControllerFindAllAlbumsUrl(params),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGalleryControllerFindAllAlbumsQueryKey = (params?: GalleryControllerFindAllAlbumsParams,) => {
    return [
    `/api/gallery/albums`, ...(params ? [params] : [])
    ] as const;
    }


export const getGalleryControllerFindAllAlbumsQueryOptions = <TData = Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError = ErrorType<unknown>>(params?: GalleryControllerFindAllAlbumsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGalleryControllerFindAllAlbumsQueryKey(params);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>> = ({ signal }) => galleryControllerFindAllAlbums(params, { signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GalleryControllerFindAllAlbumsQueryResult = NonNullable<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>>
export type GalleryControllerFindAllAlbumsQueryError = ErrorType<unknown>


export function useGalleryControllerFindAllAlbums<TData = Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError = ErrorType<unknown>>(
 params: undefined |  GalleryControllerFindAllAlbumsParams, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>,
          TError,
          Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGalleryControllerFindAllAlbums<TData = Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError = ErrorType<unknown>>(
 params?: GalleryControllerFindAllAlbumsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>,
          TError,
          Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGalleryControllerFindAllAlbums<TData = Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError = ErrorType<unknown>>(
 params?: GalleryControllerFindAllAlbumsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGalleryControllerFindAllAlbums<TData = Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError = ErrorType<unknown>>(
 params?: GalleryControllerFindAllAlbumsParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAllAlbums>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGalleryControllerFindAllAlbumsQueryOptions(params,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getGalleryControllerCreateAlbumUrl = () => {




  return `/api/gallery/albums`
}

export const galleryControllerCreateAlbum = async (createAlbumDto: CreateAlbumDto, options?: RequestInit): Promise<AlbumListItemDto> => {

  return customFetch<AlbumListItemDto>(getGalleryControllerCreateAlbumUrl(),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createAlbumDto)
  }
);}




export const getGalleryControllerCreateAlbumMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerCreateAlbum>>, TError,{data: BodyType<CreateAlbumDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof galleryControllerCreateAlbum>>, TError,{data: BodyType<CreateAlbumDto>}, TContext> => {

const mutationKey = ['galleryControllerCreateAlbum'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof galleryControllerCreateAlbum>>, {data: BodyType<CreateAlbumDto>}> = (props) => {
          const {data} = props ?? {};

          return  galleryControllerCreateAlbum(data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GalleryControllerCreateAlbumMutationResult = NonNullable<Awaited<ReturnType<typeof galleryControllerCreateAlbum>>>
    export type GalleryControllerCreateAlbumMutationBody = BodyType<CreateAlbumDto>
    export type GalleryControllerCreateAlbumMutationError = ErrorType<unknown>

    export const useGalleryControllerCreateAlbum = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerCreateAlbum>>, TError,{data: BodyType<CreateAlbumDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof galleryControllerCreateAlbum>>,
        TError,
        {data: BodyType<CreateAlbumDto>},
        TContext
      > => {
      return useMutation(getGalleryControllerCreateAlbumMutationOptions(options), queryClient);
    }

export const getGalleryControllerFindAlbumUrl = (id: string,) => {




  return `/api/gallery/albums/${id}`
}

export const galleryControllerFindAlbum = async (id: string, options?: RequestInit): Promise<AlbumDetailDto> => {

  return customFetch<AlbumDetailDto>(getGalleryControllerFindAlbumUrl(id),
  {
    ...options,
    method: 'GET'


  }
);}





export const getGalleryControllerFindAlbumQueryKey = (id: string,) => {
    return [
    `/api/gallery/albums/${id}`
    ] as const;
    }


export const getGalleryControllerFindAlbumQueryOptions = <TData = Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError = ErrorType<unknown>>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGalleryControllerFindAlbumQueryKey(id);



    const queryFn: QueryFunction<Awaited<ReturnType<typeof galleryControllerFindAlbum>>> = ({ signal }) => galleryControllerFindAlbum(id, { signal, ...requestOptions });





   return  { queryKey, queryFn, enabled: id !== null && id !== undefined, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GalleryControllerFindAlbumQueryResult = NonNullable<Awaited<ReturnType<typeof galleryControllerFindAlbum>>>
export type GalleryControllerFindAlbumQueryError = ErrorType<unknown>


export function useGalleryControllerFindAlbum<TData = Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError = ErrorType<unknown>>(
 id: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof galleryControllerFindAlbum>>,
          TError,
          Awaited<ReturnType<typeof galleryControllerFindAlbum>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGalleryControllerFindAlbum<TData = Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof galleryControllerFindAlbum>>,
          TError,
          Awaited<ReturnType<typeof galleryControllerFindAlbum>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGalleryControllerFindAlbum<TData = Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useGalleryControllerFindAlbum<TData = Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError = ErrorType<unknown>>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof galleryControllerFindAlbum>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGalleryControllerFindAlbumQueryOptions(id,options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getGalleryControllerRemoveAlbumUrl = (id: string,) => {




  return `/api/gallery/albums/${id}`
}

export const galleryControllerRemoveAlbum = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getGalleryControllerRemoveAlbumUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getGalleryControllerRemoveAlbumMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerRemoveAlbum>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof galleryControllerRemoveAlbum>>, TError,{id: string}, TContext> => {

const mutationKey = ['galleryControllerRemoveAlbum'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof galleryControllerRemoveAlbum>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  galleryControllerRemoveAlbum(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GalleryControllerRemoveAlbumMutationResult = NonNullable<Awaited<ReturnType<typeof galleryControllerRemoveAlbum>>>

    export type GalleryControllerRemoveAlbumMutationError = ErrorType<unknown>

    export const useGalleryControllerRemoveAlbum = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerRemoveAlbum>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof galleryControllerRemoveAlbum>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getGalleryControllerRemoveAlbumMutationOptions(options), queryClient);
    }

export const getGalleryControllerAddPhotoUrl = (id: string,) => {




  return `/api/gallery/albums/${id}/photos`
}

export const galleryControllerAddPhoto = async (id: string,
    addPhotoDto: AddPhotoDto, options?: RequestInit): Promise<GalleryPhotoDto> => {

  return customFetch<GalleryPhotoDto>(getGalleryControllerAddPhotoUrl(id),
  {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(addPhotoDto)
  }
);}




export const getGalleryControllerAddPhotoMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerAddPhoto>>, TError,{id: string;data: BodyType<AddPhotoDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof galleryControllerAddPhoto>>, TError,{id: string;data: BodyType<AddPhotoDto>}, TContext> => {

const mutationKey = ['galleryControllerAddPhoto'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof galleryControllerAddPhoto>>, {id: string;data: BodyType<AddPhotoDto>}> = (props) => {
          const {id,data} = props ?? {};

          return  galleryControllerAddPhoto(id,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GalleryControllerAddPhotoMutationResult = NonNullable<Awaited<ReturnType<typeof galleryControllerAddPhoto>>>
    export type GalleryControllerAddPhotoMutationBody = BodyType<AddPhotoDto>
    export type GalleryControllerAddPhotoMutationError = ErrorType<unknown>

    export const useGalleryControllerAddPhoto = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerAddPhoto>>, TError,{id: string;data: BodyType<AddPhotoDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof galleryControllerAddPhoto>>,
        TError,
        {id: string;data: BodyType<AddPhotoDto>},
        TContext
      > => {
      return useMutation(getGalleryControllerAddPhotoMutationOptions(options), queryClient);
    }

export const getGalleryControllerRemovePhotoUrl = (id: string,) => {




  return `/api/gallery/photos/${id}`
}

export const galleryControllerRemovePhoto = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getGalleryControllerRemovePhotoUrl(id),
  {
    ...options,
    method: 'DELETE'


  }
);}




export const getGalleryControllerRemovePhotoMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerRemovePhoto>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof galleryControllerRemovePhoto>>, TError,{id: string}, TContext> => {

const mutationKey = ['galleryControllerRemovePhoto'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof galleryControllerRemovePhoto>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  galleryControllerRemovePhoto(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type GalleryControllerRemovePhotoMutationResult = NonNullable<Awaited<ReturnType<typeof galleryControllerRemovePhoto>>>

    export type GalleryControllerRemovePhotoMutationError = ErrorType<unknown>

    export const useGalleryControllerRemovePhoto = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof galleryControllerRemovePhoto>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof galleryControllerRemovePhoto>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getGalleryControllerRemovePhotoMutationOptions(options), queryClient);
    }

export const getNotificationsControllerListUrl = () => {




  return `/api/notifications`
}

export const notificationsControllerList = async ( options?: RequestInit): Promise<NotificationDto[]> => {

  return customFetch<NotificationDto[]>(getNotificationsControllerListUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getNotificationsControllerListQueryKey = () => {
    return [
    `/api/notifications`
    ] as const;
    }


export const getNotificationsControllerListQueryOptions = <TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getNotificationsControllerListQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof notificationsControllerList>>> = ({ signal }) => notificationsControllerList({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type NotificationsControllerListQueryResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerList>>>
export type NotificationsControllerListQueryError = ErrorType<unknown>


export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerList>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerList>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerList>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerList>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useNotificationsControllerList<TData = Awaited<ReturnType<typeof notificationsControllerList>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerList>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getNotificationsControllerListQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getNotificationsControllerUnreadCountUrl = () => {




  return `/api/notifications/unread-count`
}

export const notificationsControllerUnreadCount = async ( options?: RequestInit): Promise<UnreadCountDto> => {

  return customFetch<UnreadCountDto>(getNotificationsControllerUnreadCountUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getNotificationsControllerUnreadCountQueryKey = () => {
    return [
    `/api/notifications/unread-count`
    ] as const;
    }


export const getNotificationsControllerUnreadCountQueryOptions = <TData = Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getNotificationsControllerUnreadCountQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>> = ({ signal }) => notificationsControllerUnreadCount({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type NotificationsControllerUnreadCountQueryResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>>
export type NotificationsControllerUnreadCountQueryError = ErrorType<unknown>


export function useNotificationsControllerUnreadCount<TData = Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerUnreadCount>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerUnreadCount<TData = Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerUnreadCount>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerUnreadCount>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerUnreadCount<TData = Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useNotificationsControllerUnreadCount<TData = Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerUnreadCount>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getNotificationsControllerUnreadCountQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getNotificationsControllerMarkReadUrl = (id: string,) => {




  return `/api/notifications/${id}/read`
}

export const notificationsControllerMarkRead = async (id: string, options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getNotificationsControllerMarkReadUrl(id),
  {
    ...options,
    method: 'PATCH'


  }
);}




export const getNotificationsControllerMarkReadMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, TError,{id: string}, TContext> => {

const mutationKey = ['notificationsControllerMarkRead'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  notificationsControllerMarkRead(id,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type NotificationsControllerMarkReadMutationResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerMarkRead>>>

    export type NotificationsControllerMarkReadMutationError = ErrorType<unknown>

    export const useNotificationsControllerMarkRead = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkRead>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof notificationsControllerMarkRead>>,
        TError,
        {id: string},
        TContext
      > => {
      return useMutation(getNotificationsControllerMarkReadMutationOptions(options), queryClient);
    }

export const getNotificationsControllerMarkAllReadUrl = () => {




  return `/api/notifications/read-all`
}

export const notificationsControllerMarkAllRead = async ( options?: RequestInit): Promise<SuccessResponseDto> => {

  return customFetch<SuccessResponseDto>(getNotificationsControllerMarkAllReadUrl(),
  {
    ...options,
    method: 'POST'


  }
);}




export const getNotificationsControllerMarkAllReadMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkAllRead>>, TError,void, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkAllRead>>, TError,void, TContext> => {

const mutationKey = ['notificationsControllerMarkAllRead'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof notificationsControllerMarkAllRead>>, void> = () => {


          return  notificationsControllerMarkAllRead(requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type NotificationsControllerMarkAllReadMutationResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerMarkAllRead>>>

    export type NotificationsControllerMarkAllReadMutationError = ErrorType<unknown>

    export const useNotificationsControllerMarkAllRead = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerMarkAllRead>>, TError,void, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof notificationsControllerMarkAllRead>>,
        TError,
        void,
        TContext
      > => {
      return useMutation(getNotificationsControllerMarkAllReadMutationOptions(options), queryClient);
    }

export const getNotificationsControllerListAlertSettingsUrl = () => {




  return `/api/notifications/alert-settings`
}

export const notificationsControllerListAlertSettings = async ( options?: RequestInit): Promise<AlertSettingDto[]> => {

  return customFetch<AlertSettingDto[]>(getNotificationsControllerListAlertSettingsUrl(),
  {
    ...options,
    method: 'GET'


  }
);}





export const getNotificationsControllerListAlertSettingsQueryKey = () => {
    return [
    `/api/notifications/alert-settings`
    ] as const;
    }


export const getNotificationsControllerListAlertSettingsQueryOptions = <TData = Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError = ErrorType<unknown>>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getNotificationsControllerListAlertSettingsQueryKey();



    const queryFn: QueryFunction<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>> = ({ signal }) => notificationsControllerListAlertSettings({ signal, ...requestOptions });





   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type NotificationsControllerListAlertSettingsQueryResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>>
export type NotificationsControllerListAlertSettingsQueryError = ErrorType<unknown>


export function useNotificationsControllerListAlertSettings<TData = Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError = ErrorType<unknown>>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerListAlertSettings<TData = Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>,
          TError,
          Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>
        > , 'initialData'
      >, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useNotificationsControllerListAlertSettings<TData = Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }

export function useNotificationsControllerListAlertSettings<TData = Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError = ErrorType<unknown>>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof notificationsControllerListAlertSettings>>, TError, TData>>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getNotificationsControllerListAlertSettingsQueryOptions(options)

  const query = useQuery(queryOptions, queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  return { ...query, queryKey: queryOptions.queryKey };
}







export const getNotificationsControllerUpdateAlertSettingUrl = (teacherId: string,) => {




  return `/api/notifications/alert-settings/${teacherId}`
}

export const notificationsControllerUpdateAlertSetting = async (teacherId: string,
    updateAlertSettingDto: UpdateAlertSettingDto, options?: RequestInit): Promise<AlertSettingDto> => {

  return customFetch<AlertSettingDto>(getNotificationsControllerUpdateAlertSettingUrl(teacherId),
  {
    ...options,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateAlertSettingDto)
  }
);}




export const getNotificationsControllerUpdateAlertSettingMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerUpdateAlertSetting>>, TError,{teacherId: string;data: BodyType<UpdateAlertSettingDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerUpdateAlertSetting>>, TError,{teacherId: string;data: BodyType<UpdateAlertSettingDto>}, TContext> => {

const mutationKey = ['notificationsControllerUpdateAlertSetting'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof notificationsControllerUpdateAlertSetting>>, {teacherId: string;data: BodyType<UpdateAlertSettingDto>}> = (props) => {
          const {teacherId,data} = props ?? {};

          return  notificationsControllerUpdateAlertSetting(teacherId,data,requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type NotificationsControllerUpdateAlertSettingMutationResult = NonNullable<Awaited<ReturnType<typeof notificationsControllerUpdateAlertSetting>>>
    export type NotificationsControllerUpdateAlertSettingMutationBody = BodyType<UpdateAlertSettingDto>
    export type NotificationsControllerUpdateAlertSettingMutationError = ErrorType<unknown>

    export const useNotificationsControllerUpdateAlertSetting = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof notificationsControllerUpdateAlertSetting>>, TError,{teacherId: string;data: BodyType<UpdateAlertSettingDto>}, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof notificationsControllerUpdateAlertSetting>>,
        TError,
        {teacherId: string;data: BodyType<UpdateAlertSettingDto>},
        TContext
      > => {
      return useMutation(getNotificationsControllerUpdateAlertSettingMutationOptions(options), queryClient);
    }

export const getAlertsControllerCheckUrl = () => {




  return `/api/alerts/check`
}

export const alertsControllerCheck = async ( options?: RequestInit): Promise<CheckAlertsResultDto> => {

  return customFetch<CheckAlertsResultDto>(getAlertsControllerCheckUrl(),
  {
    ...options,
    method: 'POST'


  }
);}




export const getAlertsControllerCheckMutationOptions = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof alertsControllerCheck>>, TError,void, TContext>, request?: SecondParameter<typeof customFetch>}
): UseMutationOptions<Awaited<ReturnType<typeof alertsControllerCheck>>, TError,void, TContext> => {

const mutationKey = ['alertsControllerCheck'];
const {mutation: mutationOptions, request: requestOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, request: undefined};




      const mutationFn: MutationFunction<Awaited<ReturnType<typeof alertsControllerCheck>>, void> = () => {


          return  alertsControllerCheck(requestOptions)
        }






  return  { mutationFn, ...mutationOptions }}

    export type AlertsControllerCheckMutationResult = NonNullable<Awaited<ReturnType<typeof alertsControllerCheck>>>

    export type AlertsControllerCheckMutationError = ErrorType<unknown>

    export const useAlertsControllerCheck = <TError = ErrorType<unknown>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof alertsControllerCheck>>, TError,void, TContext>, request?: SecondParameter<typeof customFetch>}
 , queryClient?: QueryClient): UseMutationResult<
        Awaited<ReturnType<typeof alertsControllerCheck>>,
        TError,
        void,
        TContext
      > => {
      return useMutation(getAlertsControllerCheckMutationOptions(options), queryClient);
    }

