import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
      unique: true,
    },
    tags: {
      type: Array,
      default : []   //если тэгов нету , то пустой массив
    },
    avtarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", PostSchema);
