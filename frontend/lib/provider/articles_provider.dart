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

  Future<void> fetchPokemons() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await http.get(Uri.parse('http://10.0.2.2:8000/'));

      if (response.statusCode == 200) {
        var jsonResponse = json.decode(response.body);

        for (var result in jsonResponse['response']) {
          print(":::::::::::::::::::::::::::::");
          print(result);
          /*   final articleDetailResponse =
              await http.get(Uri.parse(result['url']));
          if (articleDetailResponse.statusCode == 200) { */
          articles.add(Article.fromJson(result));
          /*     } */
        }

        /*  articles.add(Article.fromJson(jsonResponse['response'])); */

        _articles = articles;
        _dataFetched = true;
      } else {
        _error = 'Failed to load pokemons';
      }
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void clearPokemons() {
    _articles = [];
    _dataFetched = false;
    notifyListeners();
  }
}
