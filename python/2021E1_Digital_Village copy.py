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

    def dijkstra(self, inicio):
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

        return custos, caminho

    def _construir_caminho(self, caminho, inicio, fim):
        caminho_final = []
        cidade_atual = fim

        while cidade_atual != inicio:
            if cidade_atual not in caminho or caminho[cidade_atual] is None:
                return [], 0  # Retorna se não há caminho
            origem = caminho[cidade_atual]
            caminho_final.append((origem, cidade_atual))
            cidade_atual = origem
        
        caminho_final.reverse()  # Inverte para mostrar o caminho do início ao fim
        return caminho_final

    def encontrar_todos_os_caminhos(self, origem, destinos):
        custos, caminho = self.dijkstra(origem)
        
        todos_os_caminhos = []
        
        for destino in destinos:
            if destino in custos and custos[destino] < float('inf'):
                caminho_final = self._construir_caminho(caminho, origem, destino)
                todos_os_caminhos.append((destino, custos[destino], caminho_final))
        
        # Ordena os caminhos pelo custo
        todos_os_caminhos.sort(key=lambda x: x[1])
        return todos_os_caminhos

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

# Testando com a origem 5 e destinos 2, 6 e 8
origem = 5
destinos = [2, 6, 8]

todos_os_caminhos = grafo.encontrar_todos_os_caminhos(origem, destinos)

# Imprimindo os caminhos
for destino, custo, caminho_final in todos_os_caminhos:
    formato_caminho = [f"[{origem}, {destino}]" for origem, destino in caminho_final]
    print(f"Caminho de {origem} para {destino}: {', '.join(formato_caminho)} {custo} pontos")

# Se quiser imprimir apenas o melhor caminho:
if todos_os_caminhos:
    melhor_destino, melhor_custo, melhor_caminho_final = todos_os_caminhos[0]
    print(f"\nMelhor destino de {origem}: {melhor_destino} com custo {melhor_custo} pontos.")
else:
    print(f"Nenhum destino acessível a partir de {origem}.")
