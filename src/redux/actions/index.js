import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    const res = await api.get("/getLanguages");

    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk("/translate", async (p) => {
  const params = new URLSearchParams();
  params.set("source_language", p.sourceLang.value);
  params.set("target_language", p.targetLang.value);
  params.set("text", p.text);

  const res = await api.post("/translate", params);
  console.log(res);

  return res.data.data;
});
