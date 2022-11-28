export default class Video {
  constructor(video, authorId, title, views, createdAt, length) {
    this.video = video;
    this.authorId = authorId;
    this.title = title;
    this.views = views;
    this.createdAt = createdAt;
    this.length = length;
  }
}
