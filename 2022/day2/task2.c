#include <stdio.h>

#define SYMBOL_ROCK 'A'
#define SYMBOL_PAPER 'B'
#define SYMBOL_SCISSORS 'C'
#define PLAYER_LOOSE 'X'
#define PLAYER_DRAW 'Y'
#define PLAYER_WIN 'Z'

enum Scores
{
  ROCK = 1,
  PAPER,
  SCISSORS,
  LOOSE = 0,
  DRAW = 3,
  WIN = 6,
};

int getScore(char a)
{
  switch (a)
  {
  case SYMBOL_ROCK:
    return ROCK;
  case SYMBOL_PAPER:
    return PAPER;
  case SYMBOL_SCISSORS:
    return SCISSORS;
  }
  return 0;
}

int main(void)
{
  FILE *input = fopen("input.txt", "read");
  if (input == NULL)
  {
    perror("file is not exists");
    return 1;
  }

  char line[10];
  size_t totalScore;
  while (fgets(line, 10, input) != NULL)
  {
    int elfScore = getScore(line[0]);
    char expectedResult = line[2];
    switch (expectedResult)
    {
    case PLAYER_WIN:
      totalScore += WIN + (elfScore % 3) + 1;
      break;
    case PLAYER_DRAW:
      totalScore += DRAW + elfScore;
      break;
    case PLAYER_LOOSE:
      totalScore += LOOSE + elfScore == 1 ? 3 : elfScore - 1;
      break;
    default:
      break;
    }
  }

  fclose(input);
  printf("total score is %lu\n", totalScore);
};