# Helmholtz equation

Let us consider the Helmholtz equation in two space dimensions

```math
\begin{aligned}
&\Delta u(x, y)+k^{2} u(x, y)=q(x, y), \quad(x, y) \in \Omega:=(-1,1)^2 \\
&u(x, y)=0, \quad(x, y) \in \partial \Omega
\end{aligned}
```
where 
```math 
q(x, y)=-\left(a_{1} \pi\right)^{2} \sin \left(a_{1} \pi x\right) \sin \left(a_{2} \pi y\right)-\left(a_{2} \pi\right)^{2} \sin \left(a_{1} \pi x\right) \sin \left(a_{2} \pi y\right)+k^{2} \sin \left(a_{1} \pi x\right) \sin \left(a_{2} \pi y\right).
```
The excat solution is ``u(x,y)=\sin{a_1\pi x}\sin{a_2\pi y}``. We chose ``k=1, a_1 = 1`` and ``a_2 = 4``.

```@example helmholtz
using NeuralPDE, IntervalSets, Sophon, Lux, Random
using Optimization, OptimizationOptimisers

@parameters x,y
@variables u(..)
Dxx = Differential(x)^2
Dyy = Differential(y)^2

a1 = 1
a2 = 4
k = 1

q(x,y) = -(a1*π)^2 * sin(a1*π*x) * sin(a2*π*y) - (a2*π)^2 * sin(a1*π*x) * sin(a2*π*y) + k^2 * sin(a1*π*x) * sin(a2*π*y)
eq = Dxx(u(x,y)) + Dyy(u(x,y)) + k^2 * u(x,y) ~ q(x,y)
domains = [x ∈ Interval(-1,1), y ∈ Interval(-1,1)]
bcs = [u(-1,y) ~ 0, u(1,y) ~ 0, u(x, -1) ~ 0, u(x, 1) ~ 0]

@named helmholtz = PDESystem(eq, bcs, domains, [x,y], [u(x,y)])

chain = BACON(2,1; hidden_dims = 32, num_layers=5, period = 2, N = 5)

discretization = PhysicsInformedNN(chain, QuasiRandomTraining(200))
prob = discretize(helmholtz, discretization)

@time res = Optimization.solve(prob, Adam(); maxiters=3000)
```

Let's plot the result.
```@example helmholtz
phi = discretization.phi

xs, ys= [infimum(d.domain):0.01:supremum(d.domain) for d in domains]
u_analytic(x,y) = sin(a1*pi*x)*sin(a2*pi*y)
u_real = [u_analytic(x,y) for x in xs, y in ys]
u_pred = [sum(phi([x,y], res.u)) for x in xs, y in ys]

using CairoMakie
axis = (xlabel="x", ylabel="y", title="Analytical Solution")
fig, ax1, hm1 = heatmap(xs, ys, u_real, axis=axis)
Colorbar(fig[:, end+1], hm1)
ax2, hm2= heatmap(fig[1, end+1], xs, ys, u_pred, axis= merge(axis, (;title = "Prediction")))
Colorbar(fig[:, end+1], hm2)
ax3, hm3 = heatmap(fig[1, end+1], xs, ys, abs.(u_pred-u_real), axis= merge(axis, (;title = "Absolute Error")))
Colorbar(fig[:, end+1], hm3)

save("helmholtz.png", fig); nothing # hide
```
![](helmholtz.png)