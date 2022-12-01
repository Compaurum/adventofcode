#include <stdio.h>
#include <stdlib.h> /* exit */
#include <string.h> /* memcpy, memset */

void error(const char *msg)
{
  perror(msg);
  exit(0);
}

int cmpfunc(const void *a, const void *b)
{
  return (*(int *)a - *(int *)b) * -1;
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
  int allNumbers[500];
  int currentElfEnergy = 0;
  int index = 0;
  while (fgets(ch, 20, ptr) != NULL)
  {
    // check if counted all items by a single elf
    if (strlen(ch) == 1 && ch[0] == '\n')
    {
      allNumbers[index++] = currentElfEnergy;
      currentElfEnergy = 0;
    }

    int n = atoi(ch);
    currentElfEnergy += n;
  }
  allNumbers[index] = currentElfEnergy;

  // Closing the file
  fclose(ptr);
  qsort(allNumbers, index + 1, sizeof(int), cmpfunc);
  for (int i = 0; i <= index; i++)
  {
    printf("number: %d\n", allNumbers[i]);
  }
  printf("max Elf energy is %d\n ", allNumbers[0] + allNumbers[1] + allNumbers[2]);
  return 0;
}