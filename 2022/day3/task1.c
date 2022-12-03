#include <stdio.h>

int getCharScore(char c)
{
  if (c >= 'a' && c <= 'z')
  {
    return c - 'a' + 1;
  }

  return c - 'A' + 27;
}

int calculateLineScore(char *line, int length)
{
  int sum = 0;
  int counts[53] = {0};
  for (int i = 0; i < length; i++)
  {
    int charScore = getCharScore(line[i]);
    if (i < length / 2)
    {
      // count every letter only one time
      if (counts[charScore] == 0)
        counts[charScore]++;
    }
    else if (counts[charScore] == 1)
    {
      sum += charScore;
      counts[charScore]++;
    }
  }

  return sum;
}

int main(void)
{
  FILE *input = fopen("input.txt", "read");
  if (input == NULL)
  {
    perror("file is not exists");
    return 1;
  }

  char line[60];
  size_t totalScore = 0;
  while (fgets(line, sizeof(line), input) != NULL)
  {
    int length = 0;
    const char *p = line;
    while (*p != '\n' && *p != '\0')
    {
      p++;
      length++;
    }

    totalScore += calculateLineScore(line, length);
  }

  fclose(input);

  printf("total score is %lu\n", totalScore);
};