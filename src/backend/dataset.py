import pandas as pd
import random
from faker import Faker

# Initialize Faker
fake = Faker()

# Define the number of samples
num_samples = 500

# Generate sample data
data = {
    "Name": [fake.name() for _ in range(num_samples)],  # Generate realistic names
    "Income": [random.randint(10, 80) * 1000 for _ in range(num_samples)],  # Income between 10k and 80k
    "Age": [random.randint(18, 65) for _ in range(num_samples)],  # Age between 18 and 65
    "Shared_Capital": [random.randint(0, 50000) for _ in range(num_samples)],  # Shared Capital between 0 and 50k
    "Loan_Balance": [random.randint(0, 30000) for _ in range(num_samples)],  # Loan Balance between 0 and 30k
    "LoanAmount": [random.randint(1000, 50000) for _ in range(num_samples)],  # Loan Amount between 1k and 50k
    "num_loans": [random.randint(0, 5) for _ in range(num_samples)],  # Number of Loans between 0 and 5
    "num_paid_loans": [random.randint(0, 5) for _ in range(num_samples)],  # Number of Paid Loans
    "num_defaulted_loans": [random.randint(0, 2) for _ in range(num_samples)],  # Number of Defaulted Loans
    "num_active_loans": [random.randint(0, 5) for _ in range(num_samples)],  # Number of Active Loans
}

# Create a DataFrame
df = pd.DataFrame(data)

# Save the DataFrame to an Excel file
df.to_excel("loan_management_dataset.xlsx", index=False)

print("Dataset created and saved as 'loan_management_dataset.xlsx'")