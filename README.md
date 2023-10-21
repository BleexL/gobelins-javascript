# Font Match
## But du jeu
Deux mots sont superposés avec la même typographie. L'un d'eux sert de modèle et change aléatoirement en gras et en largeur à chaque génération. Le joueur contrôle la largeur et le gras de la seconde police à l'aide de sa souris. Son objectif est de faire correspondre les deux typographies pour marquer un point. Il a une minute pour marquer le plus de points possible.

## Comment jouer
L'axe Y contrôle la largeur de la typographie.
L'axe X contrôle le gras.

## Améliorations du week-end du 21 au 22 octobre 2023
Correction d'un problème de typographie sur les autres ordinateurs
Jusqu'à présent, "Nunito Sans" n'était pas chargée localement. Cependant, j'ai remarqué que sur les autres ordinateurs, cela ne fonctionnait pas du tout car elle n'était pas chargée. J'ai donc ajouté les lignes dans le fichier "index.html" permettant de se connecter à l'API de Google Fonts pour que cela fonctionne pour tout le monde.

## Mise en ligne
J'ai également mis le jeu en ligne sur GitHub Pages. Il est disponible via le lien suivant :
https://bleexl.github.io/gobelins-javascript/

## Améliorations prévues dans les semaines et mois à venir
### Deux nouveaux modes de jeu
- Deathmatch
Nous avons un temps initial de 5 secondes pour marquer un point. Marquer un point nous fait gagner du temps. Plus nous marquons de points, moins de temps nous perdons. Nous perdons lorsque nous n'avons plus de temps.
- L'œil de lynx
Nous avons un temps infini. Nous devons nous rapprocher le plus possible du modèle puis valider notre position. Un score de précision sera alors calculé. Le but est d'être le plus précis possible.

### Nouveaux axes
La typographie choisie comporte 4 axes de modifications. Seulement deux sont utilisés aujourd'hui. J'aimerais utiliser les autres dans un futur proche pour pouvoir ainsi alterner entre eux pendant les parties, afin d'ajouter encore plus de variation.

### Nouvelles typographies
Actuellement, seule "Nunito Sans" est utilisée. J'aimerais à terme utiliser d'autres typographies variables pour augmenter la rejouabilité et promouvoir la technologie de la typographie variable.

### Génération de couleurs aléatoires
Actuellement, j'ai une liste de thèmes de couleurs. J'aimerais à terme générer ces couleurs aléatoirement.

## Petits plus
### Lien vers le repository
Mon projet étant sur GitHub, si vous souhaitez suivre la suite des aventures, voici le lien vers le repository :
https://github.com/BleexL/gobelins-javascript

### Défi
Mon record actuel est de 83 en 60 secondes. Sauriez-vous faire mieux ?

Axel SAGRADO