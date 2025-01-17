module Sophon

using LinearAlgebra
using Lux, Random, NNlib, NNlibCUDA
import Lux: initialparameters, initialstates, parameterlength, statelength,
            AbstractExplicitLayer, AbstractExplicitContainerLayer, zeros32

using Optimisers, Optimization, OptimizationOptimisers
import ParameterSchedulers: Step, Exp, Poly, Inv, Triangle, TriangleDecay2, TriangleExp,
                            Sin, SinDecay2, SinExp, CosAnneal, Sequence, Loop, Interpolator,
                            Shifted, ComposedSchedule, Constant
using ParameterSchedulers: AbstractSchedule
using NeuralPDE, ComponentArrays
import SciMLBase: parameterless_type, __solve, build_solution, NullParameters
using StatsBase, QuasiMonteCarlo
using Adapt, ChainRulesCore, CUDA, GPUArrays, GPUArraysCore

NeuralPDE.RuntimeGeneratedFunctions.init(@__MODULE__)

include("layers/basic.jl")
include("layers/containers.jl")
include("layers/nets.jl")
include("utils.jl")
include("activations.jl")
include("training/scheduler.jl")
include("training/rad.jl")
include("training/causal.jl")
include("training/evo.jl")
include("compact/componentarrays.jl")
include("compact/NeuralPDE/utils.jl")
include("compact/NeuralPDE/pinn_types.jl")
include("compact/NeuralPDE/training_strategies.jl")
include("compact/NeuralPDE/pinnsampler.jl")
include("compact/NeuralPDE/discretize.jl")
include("layers/operators.jl")

export GPUComponentArray64, GPUComponentArray
export Scheduler, QuasiRandom
export gaussian, quadratic, laplacian, expsin, multiquadratic
export FourierFeature, TriplewiseFusion, FullyConnected, Sine, RBF, DiscreteFourierFeature,
       Scalar, ScalarLayer, SplitFunction
export PINNAttention, FourierNet, FourierAttention, Siren, FourierFilterNet, BACON
export DeepONet
export PINN, symbolic_discretize, discretize, get_optimization_problem, QuasiRandomSampler,
       NonAdaptiveTraining, get_optimization_problem

end
