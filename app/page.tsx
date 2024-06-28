"use client"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./lib/store/store";
import { decrement, increment } from "./lib/features/counter/counterSlice";
// import { decrement, increment } from "./store/counter/counterSlice";
// import { RootState } from "./store/store";

export default function Page() {

  const count = useSelector((state: RootState) => state?.counter.value)
  const dispatch = useDispatch()


  return <div className="text-3xl font-bold underline">
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
</div>;
}
