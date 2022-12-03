#include <stdio.h>

int getCharScore(char c)
{
  if (c >= 'a' && c <= 'z')
  {
    return c - 'a' + 1;
  }

  return c - 'A' + 27;
}

int getLineLength(char *line)
{
  int length = 0;
  const char *p = line;
  while (*p != '\n' && *p != '\0')
  {
    p++;
    length++;
  }
  return length;
}

int calculateGroupScore(char *lines[3])
{
  int res = 0;
  int counts[53] = {0};

  for (int l = 0; l < 3; l++)
  {
    int length = getLineLength(lines[l]);
    for (int i = 0; i < length; i++)
    {
      int charScore = getCharScore(lines[l][i]);
      // count every letter only one time
      if (counts[charScore] == l)
        counts[charScore]++;
      if (counts[charScore] == 3 && res < charScore)
      {
        res = charScore;
      }
    }
  }

  return res;
}

int main(void)
{
  FILE *input = fopen("input.txt", "read");
  if (input == NULL)
  {
    perror("file is not exists");
    return 1;
  }

  char line1[60];
  char line2[60];
  char line3[60];
  size_t totalScore = 0;
  while (fgets(line1, sizeof(line1), input) != NULL)
  {
    fgets(line2, sizeof(line2), input);
    fgets(line3, sizeof(line3), input);

    int length = getLineLength(line1);
    char *lines[3] = {line1, line2, line3};
    totalScore += calculateGroupScore(lines);
  }

  fclose(input);

  printf("total score is %lu\n", totalScore);
};