#include <stdio.h>
#include <stdlib.h> /* exit */
#include <string.h> /* memcpy, memset */

void error(const char *msg)
{
  perror(msg);
  exit(0);
}

int main(void)
{
  FILE *ptr = fopen("./input.txt", "r");

  if (ptr == NULL)
  {
    error("file can't be opened \n");
  }

  // Printing what is written in file
  // line by line using loop.
  char ch[20];
  int currentElfEnergy = 0;
  int maxElfEnergy = 0;
  while (fgets(ch, 20, ptr) != NULL)
  {
    // check if counted all items by a single elf
    if (strlen(ch) == 1 && ch[0] == '\n')
    {
      if (maxElfEnergy < currentElfEnergy)
      {
        maxElfEnergy = currentElfEnergy;
      }
      currentElfEnergy = 0;
    }

    int n = atoi(ch);
    currentElfEnergy += n;
  }

  // Closing the file
  fclose(ptr);

  printf("max Elf energy is %d\n ", maxElfEnergy);
  return 0;
}