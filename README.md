# Research Reference & Citation

This project is the official implementation of the research presented in the paper: "Security Challenges in Micro Frontend Architecture Web Applications".

## Abstract

This research provides an original analysis of specific attack vectors within Micro Frontend (MFE) architectures. It demonstrates how vulnerabilities such as Cross-Site Scripting (XSS), CORS misconfigurations, and insecure client-side storage function from an attacker's perspective. The work contributes to a deeper understanding of security flaws and provides practical mitigation strategies for modern web applications.

## Citation

If you use this research or the provided code demonstrator in your work, please use the following citation:

### **APA Style**
> Tănasă, A., & Dobrică, L. (2025). Security Challenges in Micro Frontend Architecture Web Applications. *U.P.B. Sci. Bull., Series C*, 87(3), 133-146.

### **BibTeX**
```bibtex
@article{tanasa2025security,
  title={Security Challenges in Micro Frontend Architecture Web Applications},
  author={Andrei Tănasă and Liliana Dobrică},
  journal={U.P.B. Sci. Bull., Series C},
  volume={87},
  number={3},
  pages={133--146},
  year={2025},
  issn={2286-3540},
  publisher={National University of Science and Technology POLITEHNICA Bucharest}
}
```

## Implementation Details

This repository contains two versions of a micro frontend shopping website: one secure implementation and one intentionally vulnerable implementation.

Tech stack includes:

- Architecture: MFE model using Module Federation (Webpack 5).

- Frontend: React with SCSS modules.

- Backend: Node.js with Express.

- Database: SQLite.

- Security: Demonstrates JWT token handling and vulnerabilities like localStorage exposure vs. secure mitigations.

## License

This project is licensed under the terms described in the `LICENSE` file.