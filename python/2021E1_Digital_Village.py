"""
    1 -- 2 (1)
    | \ - (2)
    |  3 --   4  -- 5 (3)
    |    |    |
    |   (10)  6 (5)
    |
   (10)
    |
    7 -- 8 (4)
    |
    9 (2)
"""

import heapq

class Grafo:
    def __init__(self):
        self.grafo = {}

    def adicionar_aresta(self, origem, destino, custo):
        if origem not in self.grafo:
            self.grafo[origem] = []
        if destino not in self.grafo:
            self.grafo[destino] = []
        self.grafo[origem].append((destino, custo))
        self.grafo[destino].append((origem, custo))  # Para grafos não direcionais

    def dijkstra(self, inicio, fim):
        fila_prioridade = [(0, inicio)]  # (custo, cidade)
        custos = {cidade: float('inf') for cidade in self.grafo}
        custos[inicio] = 0
        caminho = {cidade: None for cidade in self.grafo}

        while fila_prioridade:
            custo_atual, cidade_atual = heapq.heappop(fila_prioridade)

            if custo_atual > custos[cidade_atual]:
                continue

            for vizinho, custo in self.grafo[cidade_atual]:
                novo_custo = custo_atual + custo

                if novo_custo < custos[vizinho]:
                    custos[vizinho] = novo_custo
                    caminho[vizinho] = cidade_atual  # Apenas armazena a origem
                    heapq.heappush(fila_prioridade, (novo_custo, vizinho))

        return self._construir_caminho(caminho, inicio, fim, custos)

    def _construir_caminho(self, caminho, inicio, fim, custos):
        caminho_final = []
        cidade_atual = fim
        custo_total = 0

        while cidade_atual != inicio:
            if cidade_atual not in caminho or caminho[cidade_atual] is None:
                return [], 0  # Retorna se não há caminho
            origem = caminho[cidade_atual]
            custo = custos[cidade_atual] - custos[origem]  # Calcula o custo da aresta
            caminho_final.append((origem, cidade_atual, custo))
            custo_total += custo
            cidade_atual = origem
        
        caminho_final.reverse()  # Inverte para mostrar o caminho do início ao fim
        return caminho_final, custo_total

# Criação do grafo
grafo = Grafo()
grafo.adicionar_aresta(1, 2, 1)
grafo.adicionar_aresta(1, 3, 2)
grafo.adicionar_aresta(3, 4, 10)
grafo.adicionar_aresta(4, 5, 3)
grafo.adicionar_aresta(4, 6, 5)
grafo.adicionar_aresta(1, 7, 10)
grafo.adicionar_aresta(7, 8, 4)
grafo.adicionar_aresta(7, 9, 2)

# Testando os caminhos
testes = [
    (5, 1),
    (9, 8),
    (9, 3),
    (3, 2),
]

for inicio, fim in testes:
    caminho, custo_total = grafo.dijkstra(inicio, fim)
    formato_caminho = [f"[{origem}, {destino}]" for origem, destino, _ in caminho]
    print(f"Caminho de {inicio} para {fim}: {', '.join(formato_caminho)} {custo_total} pontos")
