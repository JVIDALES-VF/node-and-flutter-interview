import 'package:flutter/material.dart';
import 'package:frontend/widgets/articles_card.dart';
import 'package:provider/provider.dart';

import 'provider/articles_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ArticlesProvider()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Articles List',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: const MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final articleProvider =
        Provider.of<ArticlesProvider>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Articles'),
      ),
      body: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              if (articleProvider.dataFetched) {
                articleProvider.clearArticles();
              } else {
                articleProvider.fetchArticles();
              }
            },
            child: Consumer<ArticlesProvider>(
              builder: (context, provider, child) {
                return Text(
                    provider.dataFetched ? 'Limpiar Datos' : 'Obtener Datos');
              },
            ),
          ),
          Expanded(
            child: Consumer<ArticlesProvider>(
              builder: (context, provider, child) {
                if (provider.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                } else if (provider.error != null) {
                  return Center(child: Text('Error: ${provider.error}'));
                } else if (provider.articles.isEmpty) {
                  return const Center(child: Text('No data found'));
                } else {
                  return ListView.builder(
                    itemCount: provider.articles.length,
                    itemBuilder: (context, index) {
                      return CardInfo(
                        image: provider.articles[index].urlToImage,
                        title: provider.articles[index].title,
                        author: provider.articles[index].author,
                        description: provider.articles[index].description,
                      );
                    },
                  );
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}
