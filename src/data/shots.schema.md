# Shots Schema (Normalized)

Each shot object must include:
- id (string)
- player (string)
- team (string)
- season (string)
- x (number)  // feet, half-court coordinates
- y (number)  // feet
- made (boolean)
- shotType ("2PT" | "3PT")

Notes:
- Hoop is (0,0)
- Positive y goes toward half-court
- x is left(-) to right(+)
