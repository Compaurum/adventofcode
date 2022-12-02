#include <stdio.h>

#define ELF_ROCK 'A'
#define ELF_PAPER 'B'
#define ELF_SCISSORS 'C'
#define PLAYER_ROCK 'X'
#define PLAYER_PAPER 'Y'
#define PLAYER_SCISSORS 'Z'

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
  case ELF_ROCK:
  case PLAYER_ROCK:
    return ROCK;
  case ELF_PAPER:
  case PLAYER_PAPER:
    return PAPER;
  case ELF_SCISSORS:
  case PLAYER_SCISSORS:
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
    int playerScore = getScore(line[2]);

    if (playerScore - 1 == elfScore % 3)
    {
      totalScore += playerScore + WIN;
    }
    else if (playerScore == elfScore)
    {
      totalScore += playerScore + DRAW;
    }
    else
    {
      totalScore += playerScore + LOOSE;
    }

    // printf("-%c-%c\n", line[0], line[2]);
  }

  fclose(input);
  printf("total score is %lu\n", totalScore);
};