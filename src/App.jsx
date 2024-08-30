import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdGTranslate } from "react-icons/md";
import Select from "react-select";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { getLanguages, translateText } from "./redux/actions";
import { cleareAnswer } from "./redux/slices/translateSlice";

function App() {
  const dispatch = useDispatch();

  const { isLoading, isError, languages } = useSelector(
    (store) => store.languageReducer
  );

  const translateState = useSelector((store) => store.translateReducer);
  console.log(translateState);

  const areaRef = useRef();

  const [sourceLang, setSourceLang] = useState({
    label: "English",
    value: "en",
  });
  const [targetLang, setTargetLang] = useState({
    label: "Turkish",
    value: "tr",
  });

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    dispatch(cleareAnswer());

    areaRef.current.value = "";
  };

  return (
    <>
      <div className="bg-zinc-900 h-screen text-white grid place-items-center">
        <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
          <h1 className="mb-7 text-4xl font-semibold flex justify-center align-items-center gap-3">
            <MdGTranslate />
          </h1>

          {}
          <div className="flex align-items-center gap-3 text-black font-bold">
            <Select
              onChange={(e) => setSourceLang(e)}
              value={sourceLang}
              options={formatted}
              className="flex-1"
            />
            <button
              onClick={handleSwap}
              className="text-white bg-zinc-700 px-6 rounded hover:ring-2 hover:bg-zinc-800 text-2xl"
            >
              <FaArrowRightArrowLeft />
            </button>
            <Select
              onChange={(e) => setTargetLang(e)}
              value={targetLang}
              options={formatted}
              className="flex-1"
            />
          </div>

          {}
          <div className="flex mt-5 gap-3 md:gap-[105px] max-md:flex-col">
            <div className="flex-1">
              <textarea
                ref={areaRef}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[300px] max-h-[500px] text-black p-[10px] text-[20px] rounded"
              ></textarea>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={translateState.answer}
                disabled
                className="text-gray-200 w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded"
              ></textarea>

              {translateState.isLoading && (
                <div className="loader absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            className="bg-zinc-700 mt-3 py-3 px-5 rounded hover:ring-2 hover:bg-zinc-800 text-[17px] font-semibold"
          >
            Translate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
