#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>  // Biblioteca para medir o tempo
using namespace std;

int main(){
    auto start = chrono::high_resolution_clock::now();  // Marca o início do tempo

    vector<int> cars = {2, 5, 3, 3, 5, 2, 5};
    sort(cars.begin(), cars.end(), greater<int>());

    int l = 4;
    int c = 0;

    while (cars.size() > 0) {
        int i = 0;
        int sum = 0;  // Renomear a variável 's' para 'sum' para evitar conflito com a variável de tempo
        while (sum <= l) {
            try {
                if (cars.at(i) - 1 > 0) {
                    cars[i]--;
                    sum++;
                } else {
                    cars.erase(cars.begin() + i);
                }
                i++;
            }
            catch (const out_of_range &e) {
                break;
            }
        }
        c++;
    }

    cout << "Valor de c: " << c << endl;

    auto end = chrono::high_resolution_clock::now();  // Marca o fim do tempo

    // Calcula a duração em milissegundos com precisão de ponto flutuante
    chrono::duration<double, milli> duration = end - start;

    cout << "Tempo de execução: " << duration.count() << " ms" << endl;

    return 0;
}
