import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:frontend/model/articles.dart';
import 'package:http/http.dart' as http;

class ArticlesProvider with ChangeNotifier {
  List<Article> _articles = [];
  bool _isLoading = false;
  String? _error;
  bool _dataFetched = false;

  List<Article> get articles => _articles;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get dataFetched => _dataFetched;

  Future<void> fetchArticles() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      // IP para correr desde Android  10.0.2.2
      // IP para correr desde emulador iOS 127.0.0.1
      final response =
          await http.get(Uri.parse('http://10.0.2.2:8000/articles'));

      if (response.statusCode == 200) {
        var jsonResponse = json.decode(response.body);

        for (var result in jsonResponse['response']) {
          articles.add(Article.fromJson(result));
        }

        _articles = articles;
        _dataFetched = true;
      } else {
        _error = 'Failed to load Articles';
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearArticles() {
    _articles = [];
    _dataFetched = false;
    notifyListeners();
  }
}
