Base.getindex(c::Chain, i::Int) = c.layers[i]
Base.length(c::Chain) = length(c.layers)
