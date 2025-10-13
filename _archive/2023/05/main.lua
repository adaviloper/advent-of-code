local data = require('05.data')
local utils = require('utils.utils')

local groups = {}
local mapOrder = {
  'seed-to-soil',
  'soil-to-fertilizer',
  'fertilizer-to-water',
  'water-to-light',
  'light-to-temperature',
  'temperature-to-humidity',
  'humidity-to-location',
}

---@return table
local function parseData()
  local key = 'seeds'
  for i, l in pairs(data) do
    if l == '' then
      -- do nothing
    elseif l:gmatch('seeds:')() then
      l = l:gsub('seeds: ', '')
      groups[key] = utils.split(l, ' ')
    elseif l:gmatch(' map:')() then
      key = l:gsub(' map:', '')
      groups[key] = {}
    else
      local input = utils.split(l, ' ')
      table.insert(groups[key], {
        ['destination'] = tonumber(input[1]),
        ['origin'] = tonumber(input[2]),
        ['range'] = tonumber(input[3]),
      })
    end
  end

  for i = 1, #groups['seeds'] do
    groups['seeds'][i] = tonumber(groups['seeds'][i])
  end

  for i = 1, #mapOrder do
    table.sort(groups[mapOrder[i]], function(a, b)
      return a['origin'] > b['origin']
    end)
  end

  return groups
end

local function calculateLocations(seeds)
  local locationNumber = {}
  local temp = 0

  for i = 1, #seeds do
    temp = seeds[i]
    for j = 1, #mapOrder do
      for k = 1, #groups[mapOrder[j]] do
        local plot = groups[mapOrder[j]][k]
        if temp >= plot['origin'] and temp < (plot['origin'] + plot['range']) then
          temp = temp - plot['origin'] + plot['destination']
          goto continue
        end
      end
      ::continue::
    end
    table.insert(locationNumber, temp)
  end

  table.sort(locationNumber)

  return locationNumber[1]
end

local function problem1()
  local parsedData = parseData()

  local seeds = parsedData['seeds']

  return calculateLocations(seeds)
  -- print(utils.dump(parsedData))
end

local function problem2()
  local parsedData = parseData()

  local seeds = utils.chunk(parsedData['seeds'], 2)

  for i = 1, #seeds do
    calculateLocations(seeds[i])
  end

  -- return calculateLocations(seeds)
end

print(problem1() == 107430936)
-- print(problem2())

