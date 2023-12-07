local data = require('02.data')
local utils = require('utils.utils')

-- Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
local maxRed = 12
local maxGreen = 13
local maxBlue = 14

local function split(input, separator)
  local t = {}
  for str in string.gmatch(input, '[^' .. separator .. ']+') do
    table.insert(t, str)
  end
  return t
end

local function getFormatedGames()
  local formattedGames = {}
  for _, v in pairs(data) do
    local splitData = split(v, ':')
    local gameId = split(splitData[1], ' ')
    local sets = split(splitData[2], ';')
    local groups = {}
    for _, group in pairs(sets) do
      local pick = {}
      for _, groupData in pairs(split(group, ',')) do
        local colorData = split(groupData, ' ')
        pick[colorData[2]] = tonumber(colorData[1])
      end
      table.insert(groups, pick)
    end

    local game = {
      ["id"] = gameId[2],
      ["sets"] = groups
    }
    table.insert(formattedGames, game)
  end
  return formattedGames
end

local function problem1()
  local sum = 0
  for _, game in pairs(getFormatedGames()) do
    for _, set in pairs(game['sets']) do
      if set['red'] ~= nil and set['red'] > maxRed then
        goto continue
      end
      if set['green'] ~= nil and set['green'] > maxGreen then
        goto continue
      end
      if set['blue'] ~= nil and set['blue'] > maxBlue then
        goto continue
      end
    end
    sum = sum + game['id']
    ::continue::
  end
  return sum
end

local function product(a, b)
  if a == nil then
    a = 1
  end
  if b == nil then
    b = 1
  end
  return a * b
end

local function problem2()
  local sum = 0
  for _, game in pairs(getFormatedGames()) do
    local mr = 0
    local mg = 0
    local mb = 0
    for _, set in pairs(game['sets']) do
      if set['red'] ~= nil and set['red'] > mr then
        mr = set['red']
      end
      if set['green'] ~= nil and set['green'] > mg then
        mg = set['green']
      end
      if set['blue'] ~= nil and set['blue'] > mb then
        mb = set['blue']
      end
    end
    sum = sum + product(product(mr, mg), mb)
  end
  return sum
end

-- local f = {
--   [1] = {
--     ["id"] = 1,
--     ["sets"] = {
--       [1] = {
--         ["blue"] = 3,
--         ["red"] = 4, },
--       [2] = {
--         ["blue"] = 6,
--         ["green"] = 2,
--         ["red"] = 1, },
--       [3] = {
--         ["green"] = 2, }, }, },
--   [2] = {
--     ["id"] = 2,
--     ["sets"] = {
--       [1] = {
--         ["blue"] = 1,
--         ["green"] = 2, },
--       [2] = {
--         ["blue"] = 4,
--         ["green"] = 3,
--         ["red"] = 1, },
--       [3] = {
--         ["green"] = 1,
--         ["blue"] = 1, }, }, },
--   [3] = {
--     ["id"] = 3,
--     ["sets"] = {
--       [1] = {
--         ["blue"] = 6,
--         ["green"] = 8,
--         ["red"] = 20, },
--       [2] = {
--         ["blue"] = 5,
--         ["green"] = 13,
--         ["red"] = 4, },
--       [3] = {
--         ["green"] = 5,
--         ["red"] = 1, }, }, },
--   [4] = {
--     ["id"] = 4,
--     ["sets"] = {
--       [1] = {
--         ["blue"] = 6,
--         ["green"] = 1,
--         ["red"] = 3, },
--       [2] = {
--         ["green"] = 3,
--         ["red"] = 6, },
--       [3] = {
--         ["blue"] = 15,
--         ["green"] = 3,
--         ["red"] = 14, }, }, },
--   [5] = {
--     ["id"] = 5,
--     ["sets"] = {
--       [1] = {
--         ["blue"] = 1,
--         ["green"] = 3,
--         ["red"] = 6, },
--       [2] = {
--         ["blue"] = 2,
--         ["green"] = 2,
--         ["red"] = 1, }, }, },
-- }

-- print(problem1())
print(problem2())
