local data = require('04.data')
local utils = require('utils.utils')

---@return table
local function parseData()
  local cards = {}
  for i, l in pairs(data) do
    local card = utils.split(l, ':')
    local numbers = utils.split(card[2], '|')
    local winningNumbers = numbers[1]
    local ourNumbers = numbers[2]
    table.insert(cards, i, {
      winners = utils.split(winningNumbers, ' '),
      ours = utils.split(ourNumbers, ' '),
    })
  end
  return cards
end

local function problem1()
  local parsedData = parseData()
  local cards = {}
  local total = 0
  for i, l in pairs(parsedData) do
    print(utils.dump(parsedData[i]['winners']))
    table.insert(cards, i, {
      winners = utils.keyBy(parsedData[i]['winners']),
      ours = utils.keyBy(parsedData[i]['ours']),
    })
  end

  for i = 1, #cards do
    local numberOfWinningNumbers = 0
    for k, v in pairs(cards[i]['ours']) do
      if cards[i]['winners'][v] ~= nil then
        numberOfWinningNumbers = numberOfWinningNumbers + 1
      end
    end
    if numberOfWinningNumbers > 0 then
      total = total + 2^(numberOfWinningNumbers-1)
    end
  end
  
  return total
end

local ctr = 0

---@param cards table
---@param index integer
---@param numbersToCheck table
---@return number
local function checkWinningNumbers(cards, numbersToCheck, index)
  if cards[index] == nil then return 0 end
  local numberOfWinningNumbers = 0
  for i = 1, #cards[index]['winners'] do
    if numbersToCheck[cards[index]['winners'][i]] ~= nil then
      numberOfWinningNumbers = numberOfWinningNumbers + 1
      ctr = ctr + 1
      checkWinningNumbers(cards, cards[index + numberOfWinningNumbers]['ours'], index + numberOfWinningNumbers)
    end
  end
  return numberOfWinningNumbers
end

local function problem2()
  local parsedData = parseData()
  local cards = {}
  local total = 0
  for i in pairs(parsedData) do
    table.insert(cards, i, {
      winners = parsedData[i]['winners'],
      ours = utils.keyBy(parsedData[i]['ours']),
    })
  end

  for i = 1, #cards do
    ctr = ctr + 1
    checkWinningNumbers(cards, cards[i]['ours'], i)
  end

  return ctr
end

-- print(problem1())
print(problem2(), ctr)

