import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ApiResponse } from "../../api";
import NoDataDialog from "../dialogs/ErrorDialog";

interface Props<T>{
    run: boolean;
    setRun: (value: React.SetStateAction<boolean>) => void
    pending: boolean;
    setIsPending: (value: React.SetStateAction<boolean>) => void
    req: (...args: any[]) =>  Promise<ApiResponse<T>>;
    setData: (value: React.SetStateAction<T>) => void
    setResult: (value: React.SetStateAction<ApiResponse<T>>) => void
    result: ApiResponse<any>
}

function APIRequest<T> ({ run, setRun, pending, setIsPending, req, setData, setResult, result }: Props<T>): React.ReactElement  {
    const history = useHistory();

useEffect(() => {
  if (!run && pending) {
    setIsPending(false);
  }
}, [run, pending])

useEffect(() => {
  const getData = async () => {
    setIsPending(true);
    var res = await req();
    setResult(res);
    setRun(false);
    if (res && (res.errorStatus === 0 || res.errorMessage === undefined)) {
      if (res.errorStatus === 401) {
        history.push("/login");
        return;
      }
      if (res.data) {
        setData(res.data);
      }
    }
  }

  if (run && !pending) {
    getData();
  }
}, [run, pending, setIsPending, setRun, setResult]);

    return (
      <NoDataDialog open={result.errorStatus !== 0 && result.errorMessage !== undefined} onClose={() => setResult({data: undefined, errorMessage: "", errorStatus: 0})} title={"An error occurred"} text={"" + result.errorMessage}/>
    );
}

export default APIRequest;