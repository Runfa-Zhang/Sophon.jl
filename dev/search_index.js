var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = Sophon","category":"page"},{"location":"#Sophon","page":"Home","title":"Sophon","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for Sophon.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [Sophon]","category":"page"},{"location":"#Sophon.PINNAttentionNet","page":"Home","title":"Sophon.PINNAttentionNet","text":"PINNAttentionNet(H_net, U_net, V_net, fusion::TriplewiseFusion)\nPINNAttentionNet(H_net, U_net, V_net; fusion_layers)\n\nThe output dimesion of H_net and the input dimension of layers must be the same .\n\n           x → U_net → u                     u\n                         ↘                     ↘\nx → H_net →  h1 → layer1 → connection → layer2 → connection\n                         ↗                     ↗\n           x → V_net → v                     v\n\nReferences\n\n[1] Wang, Sifan, Yujun Teng, and Paris Perdikaris. \"Understanding and mitigating gradient flow pathologies in physics-informed neural networks.\" SIAM Journal on Scientific Computing 43.5 (2021): A3055-A3081\n\n\n\n\n\n","category":"type"},{"location":"#Sophon.TriplewiseFusion","page":"Home","title":"Sophon.TriplewiseFusion","text":"TriplewiseFusion(connection, layers...)\n\n         u1                    u2\n            ↘                     ↘\nh1 → layer1 → connection → layer2 → connection\n            ↗                     ↗\n         v1                    v2\n\nArguments\n\nconnection: Takes 3 inputs and combines them\nlayers: AbstractExplicitLayers\n\nInputs\n\nLayer behaves differently based on input type:\n\nA tripe of (h, u, v), where u and v itself are tuples of length N, the layers is also a tuple of length N. The computation is as follows\n\nfor i in 1:N\n    h = connection(layers[i](h), u[i], v[i])\nend\n\nA triple of (h, u, v), where u and v are AbstractArrays.\n\nfor i in 1:N\n    h = connection(layers[i](h), u, v)\nend\nh = layers[end](h)\n\nReturns\n\nSee Inputs section for how the return value is computed\nUpdated model state for all the contained layers\n\nParameters\n\nParameters of each layer wrapped in a NamedTuple with fields = layer_1, layer_2, ..., layer_N\n\nStates\n\nStates of each layer wrapped in a NamedTuple with fields = layer_1, layer_2, ..., layer_N\n\n\n\n\n\n","category":"type"}]
}
