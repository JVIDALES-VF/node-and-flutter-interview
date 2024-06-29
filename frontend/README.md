# frontend

A new Flutter project.

## Getting Started

Para correr la aplicación desde localhost cabiar la ip del archivo articles_provider.dart
de la linea 25.


      // IP para correr desde Android  10.0.2.2
      // IP para correr desde emulador iOS 127.0.0.1
      final response = await http.get(Uri.parse('http://10.0.2.2:8000/'));
Nota: Para un dispositivo fisico es necesario obtener la ip del equipo, por ejemplo en windows
      correr el comando ipconfig y obtener la ip de IPv4 de esta manera se podra tener acceso desde un
      dispositivo fisico.

      Por default se deja la configuración para correr sobre un emulador en andoid.
      

