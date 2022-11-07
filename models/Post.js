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
      default: [], //если тэгов нету , то пустой массив
    },
    viewsCount: {
      type: Number,
      default: 0, /// если не буд кол просм по умолч 0
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ссылаешься на пользов по id
      unique: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
