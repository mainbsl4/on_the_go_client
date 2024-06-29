"use client";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store/store";
import { decrement, increment } from "./lib/features/counter/counterSlice";
import MyForm from "./components/forms/MyForm";

export default function Page() {
  const count = useSelector((state: RootState) => state?.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      Hello world!
      <div>
        <div>
          <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </div>
        </div>
      </div>
      <MyForm/>
    </div>
  );
}
