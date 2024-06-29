class Article {
  final String id;
  final String author;
  final String title;
  final String description;
  final String url;
  final String urlToImage;
  final String publishedAt;

  Article(
      {required this.id,
      required this.author,
      required this.title,
      required this.description,
      required this.url,
      required this.urlToImage,
      required this.publishedAt});

  factory Article.fromJson(Map<dynamic, dynamic> json) {
    return Article(
      id: json['_id'],
      author: json['author'],
      title: json['title'],
      description: json['description'],
      url: json['url'],
      urlToImage: json['urlToImage'],
      publishedAt: json['publishedAt'],
    );
  }
}
