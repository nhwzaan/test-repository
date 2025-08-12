# Function to check if a number is even or odd
def check_even_odd(number):
    if number % 2 == 0:
        return f"{number} is Even"
    else:
        return f"{number} is Odd"

# Loop through a range of numbers
for num in range(1, 6):
    result = check_even_odd(num)
    print(result)

# Example of a list and its manipulation
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")  # Adding an item to the list
print("Updated fruit list:", fruits)

# Using a dictionary
person = {"name": "Alice", "age": 25, "city": "New York"}
print(f"{person['name']} is {person['age']} years old and lives in {person['city']}.")